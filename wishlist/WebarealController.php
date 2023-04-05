<?php

declare(strict_types=1);

namespace App\Controller;

use App\Lib\Eshop\Webareal;
use App\Model\Table\WebarealsTable;
use Cake\Event\EventInterface;
use Cake\Http\Response;

/**
 * Webareal controller.
 *
 * @property WebarealsTable Webareals
 */
class WebarealController extends AppController
{
    /**
     * Valid snippets.
     *
     * @var array
     */
    const VALID_SNIPPETS = [
        'favorite',
        'image',
    ];

    /**
     * @inheritDoc
     */
    public function beforeFilter(EventInterface $event): ?Response
    {
        $this->Authentication->allowUnauthenticated([
            'installJs',
            'uninstallJs',
            'updateJs',
        ]);

        return parent::beforeFilter($event);
    }

    /**
     * Instalacia JS.
     *
     * @param string $type
     *
     * @return Response
     */
    public function installJs(string $type): Response
    {
        $this->Authorization->skipAuthorization();

        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['eshopCode']) || !in_array($type, self::VALID_SNIPPETS, true)) {
            return $this->error();
        }

        $webareal = new Webareal([
            'market'     => 'sk',
            'url'        => 'https://' . $data['apiUrl'],
            'apitoken'   => $data['apiToken'],
            'eshop_code' => $data['eshopCode'],
        ]);

        if (!$webareal->login()) {
            return $this->error();
        }

        $this->loadModel('Webareals');

        // Ulozime zaznam
        $this->Webareals->create($data['eshopCode'], $data);

        $path = RESOURCES . 'webareal-snippet-' . $type . '.html';

        $webareal->addSnippet('footer', file_get_contents($path));

        return $this->json(['status' => 'DONE']);
    }

    /**
     * Uprava JS.
     *
     * @param string $type
     * @param string $eshop_code
     *
     * @return Response
     */
    public function updateJs(string $type, string $eshop_code): Response
    {
        $this->Authorization->skipAuthorization();

        if (empty($eshop_code) || !in_array($type, self::VALID_SNIPPETS, true)) {
            return $this->error();
        }

        $this->loadModel('Webareals');

        // Vytiahneme data
        $data = $this->Webareals->getData($eshop_code);

        if (empty($data)) {
            // Nemame data
            return $this->error();
        }

        $webareal = new Webareal([
            'market'     => 'sk',
            'url'        => 'https://' . $data['apiUrl'],
            'apitoken'   => $data['apiToken'],
            'eshop_code' => $data['eshopCode'],
        ]);

        if (!$webareal->login()) {
            return $this->error();
        }

        $path = RESOURCES . 'webareal-snippet-' . $type . '.html';

        $webareal->addSnippet('footer', file_get_contents($path));

        return $this->success();
    }

    /**
     * Odinstalacia JS.
     *
     * @param string $type
     *
     * @return Response
     */
    public function uninstallJs(string $type): Response
    {
        $this->Authorization->skipAuthorization();

        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['eshopCode']) || !in_array($type, self::VALID_SNIPPETS, true)) {
            return $this->error();
        }

        $this->loadModel('Webareals');

        // Vytiahneme data
        $data = $this->Webareals->getData($data['eshopCode']);

        if (empty($data)) {
            // Nemame data
            return $this->error();
        }

        $webareal = new Webareal([
            'market'     => 'sk',
            'url'        => 'https://' . $data['apiUrl'],
            'apitoken'   => $data['apiToken'],
            'eshop_code' => $data['eshopCode'],
        ]);

        if (!$webareal->login()) {
            return $this->error();
        }

        // Zmazeme zaznam
        $this->Webareals->remove($data['eshopCode']);

        $webareal->deleteSnippet('footer');

        return $this->success();
    }
}

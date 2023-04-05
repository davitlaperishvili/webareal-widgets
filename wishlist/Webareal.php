<?php
declare(strict_types=1);

namespace App\Lib\Eshop;

use App\Lib\Request;
use Cake\Core\Configure;

/**
 * Webareal eshop.
 *
 * @property Webareal
 */
class Webareal
{
    protected $credentials = [];

    /**
     * Webareal constructor.
     *
     * @param array $credentials
     */
    public function __construct(array $credentials = [])
    {
        $this->credentials = $credentials;
    }

    /**
     * Prihlas eshop.
     *
     * @return bool
     */
    public function login(): bool
    {
        $username = Configure::read('App.webareal_username_' . $this->credentials['market']);
        $password = Configure::read('App.webareal_password_' . $this->credentials['market']);

        $data = (new Request($this->credentials['url']))
            ->uri('/login')
            ->header('Content-Type', 'application/json')
            ->header('X-Wa-api-token', $this->credentials['apitoken'])
            ->data('username', $username)
            ->data('password', $password)
            ->post()
            ->json();

        if (empty($data['token'])) {
            // Nepodarilo sa prihlasit
            return false;
        }

        // Nasetujeme token do credentials
        $this->credentials['token'] = $data['token'];

        return true;
    }

    public function addSnippet(string $entry, string $code): bool
    {
        (new Request($this->credentials['url']))
            ->uri('/plugin/snippet/' . $entry)
            ->data('snippet', $code)
            ->header('Content-Type', 'application/json')
            ->header('X-Wa-api-token', $this->credentials['apitoken'])
            ->header('Authorization', 'Bearer ' . $this->credentials['token'])
            ->post()
            ->text();

        return true;
    }

    public function deleteSnippet(string $entry): bool
    {
        (new Request($this->credentials['url']))
            ->uri('/plugin/snippet/' . $entry)
            ->header('X-Wa-api-token', $this->credentials['apitoken'])
            ->header('Authorization', 'Bearer ' . $this->credentials['token'])
            ->delete()
            ->text();

        return true;
    }
}

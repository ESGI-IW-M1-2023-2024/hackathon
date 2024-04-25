<?php

namespace App\Factory;

use App\Entity\Theme;
use App\Repository\ThemeRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Theme>
 *
 * @method        Theme|Proxy                     create(array|callable $attributes = [])
 * @method static Theme|Proxy                     createOne(array $attributes = [])
 * @method static Theme|Proxy                     find(object|array|mixed $criteria)
 * @method static Theme|Proxy                     findOrCreate(array $attributes)
 * @method static Theme|Proxy                     first(string $sortedField = 'id')
 * @method static Theme|Proxy                     last(string $sortedField = 'id')
 * @method static Theme|Proxy                     random(array $attributes = [])
 * @method static Theme|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ThemeRepository|RepositoryProxy repository()
 * @method static Theme[]|Proxy[]                 all()
 * @method static Theme[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Theme[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Theme[]|Proxy[]                 findBy(array $attributes)
 * @method static Theme[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Theme[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class ThemeFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'content' => '<img src="https://images.pexels.com/photos/13622705/pexels-photo-13622705.jpeg" alt="Vins de France" style="width: 300px; height: auto; float: right"/>
            Embarquez pour un voyage sensoriel à travers les régions viticoles de France avec notre atelier spécialement pensé pour initier les novices à l\'art de la dégustation de vins. Découvrez la diversité et la richesse des domaines viticoles français, de la Bourgogne au Rhône, en passant par Bordeaux, l’Alsace ou encore la Loire<br />
            Au cours de cet atelier, vous apprendrez à identifier les caractéristiques uniques des vins de chaque grande région viticole, en explorant leurs cépages emblématiques et leurs arômes associés.<br />
            Cet atelier est une célébration de la tradition viticole française, une aventure gustative qui vous guide à travers les paysages de notre patrimoine œnologique.<br />
            Ce premier tour de France des régions viticoles promet de belles découvertes et vous propose une expérience enrichissante. Faites le premier pas vers la maîtrise de l\'art de la dégustation du vin.',
            'label' => self::faker()->text(20),
            'subtitle' => self::faker()->text(20),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Theme $theme): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Theme::class;
    }
}

<?php

namespace App\Factory;

use App\Entity\Wine;
use App\Enum\WineBottleSize;
use App\Repository\WineRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Wine>
 *
 * @method        Wine|Proxy                     create(array|callable $attributes = [])
 * @method static Wine|Proxy                     createOne(array $attributes = [])
 * @method static Wine|Proxy                     find(object|array|mixed $criteria)
 * @method static Wine|Proxy                     findOrCreate(array $attributes)
 * @method static Wine|Proxy                     first(string $sortedField = 'id')
 * @method static Wine|Proxy                     last(string $sortedField = 'id')
 * @method static Wine|Proxy                     random(array $attributes = [])
 * @method static Wine|Proxy                     randomOrCreate(array $attributes = [])
 * @method static WineRepository|RepositoryProxy repository()
 * @method static Wine[]|Proxy[]                 all()
 * @method static Wine[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Wine[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Wine[]|Proxy[]                 findBy(array $attributes)
 * @method static Wine[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Wine[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class WineFactory extends ModelFactory
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
            'alcoholLevel' => self::faker()->randomFloat(),
            'bottleSize' => self::faker()->shuffleArray(WineBottleSize::cases())[0],
            'color' => self::faker()->hexColor(),
            'grapeVariety' => self::faker()->words(3, true),
            'label' => self::faker()->words(3, true),
            'producer' => self::faker()->name(),
            'productYear' => self::faker()->year(),
            'quantity' => self::faker()->numberBetween(0, 100),
            'region' => RegionFactory::random(),
            'comments' => self::faker()->text(),
            'content' => self::faker()->text(),
            'imageFilename' => '/src/assets/wines/wine1.png',
            'servingTemperature' => self::faker()->randomFloat(),
            'storage' => self::faker()->text(40),
            'upTo' => self::faker()->numberBetween(2024, 2100),
            'taste' => self::faker()->text(30),
            'byTaste' => self::faker()->text(30),
            'byEye' => self::faker()->text(30),
            'onTheNose' => self::faker()->text(30),
            'inTheMouth' => self::faker()->text(30),
            'winePairing' => self::faker()->text(30),
            'recommandedPairing' => self::faker()->text(30),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Wine $wine): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Wine::class;
    }
}

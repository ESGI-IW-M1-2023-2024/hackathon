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
            'grapeVariety' => self::faker()->text(255),
            'label' => self::faker()->text(30),
            'producer' => self::faker()->name(),
            'productYear' => self::faker()->year(),
            'quantity' => self::faker()->randomNumber(),
            'region' => RegionFactory::random(),
            'comments' => self::faker()->text(),
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

<?php

namespace App\Factory;

use App\Entity\Organisation;
use App\Repository\OrganisationRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Organisation>
 *
 * @method        Organisation|Proxy                     create(array|callable $attributes = [])
 * @method static Organisation|Proxy                     createOne(array $attributes = [])
 * @method static Organisation|Proxy                     find(object|array|mixed $criteria)
 * @method static Organisation|Proxy                     findOrCreate(array $attributes)
 * @method static Organisation|Proxy                     first(string $sortedField = 'id')
 * @method static Organisation|Proxy                     last(string $sortedField = 'id')
 * @method static Organisation|Proxy                     random(array $attributes = [])
 * @method static Organisation|Proxy                     randomOrCreate(array $attributes = [])
 * @method static OrganisationRepository|RepositoryProxy repository()
 * @method static Organisation[]|Proxy[]                 all()
 * @method static Organisation[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Organisation[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Organisation[]|Proxy[]                 findBy(array $attributes)
 * @method static Organisation[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Organisation[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class OrganisationFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'archived' => self::faker()->boolean(),
            'label' => self::faker()->text(10),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Organisation $organisation): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Organisation::class;
    }
}

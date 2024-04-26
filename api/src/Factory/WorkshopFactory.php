<?php

namespace App\Factory;

use App\Entity\Workshop;
use App\Repository\WorkshopRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Workshop>
 *
 * @method        Workshop|Proxy                     create(array|callable $attributes = [])
 * @method static Workshop|Proxy                     createOne(array $attributes = [])
 * @method static Workshop|Proxy                     find(object|array|mixed $criteria)
 * @method static Workshop|Proxy                     findOrCreate(array $attributes)
 * @method static Workshop|Proxy                     first(string $sortedField = 'id')
 * @method static Workshop|Proxy                     last(string $sortedField = 'id')
 * @method static Workshop|Proxy                     random(array $attributes = [])
 * @method static Workshop|Proxy                     randomOrCreate(array $attributes = [])
 * @method static WorkshopRepository|RepositoryProxy repository()
 * @method static Workshop[]|Proxy[]                 all()
 * @method static Workshop[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Workshop[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Workshop[]|Proxy[]                 findBy(array $attributes)
 * @method static Workshop[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Workshop[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class WorkshopFactory extends ModelFactory
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
        $date = self::faker()->dateTimeBetween('-1 month', '+1 month')->setTime(18, 0);
        return [
            'dateStart' => \DateTimeImmutable::createFromMutable($date),
            'length' => self::faker()->numberBetween(60, 120),
            'location' => self::faker()->text(30),
            'maxBookingDate' => \DateTimeImmutable::createFromMutable($date->modify('-7 day')),
            'maxPerson' => self::faker()->randomNumber(2),
            'status' => self::faker()->randomElement(\WorkshopStatus::cases()),
            'theme' => ThemeFactory::random(),
            'organisation' => OrganisationFactory::random(),
            'price' => self::faker()->randomFloat(2, 0, 100),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Workshop $workshop): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Workshop::class;
    }
}

<?php

namespace App\Factory;

use App\Entity\Booking;
use App\Enum\BookingStatus;
use App\Repository\BookingRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Booking>
 *
 * @method        Booking|Proxy                     create(array|callable $attributes = [])
 * @method static Booking|Proxy                     createOne(array $attributes = [])
 * @method static Booking|Proxy                     find(object|array|mixed $criteria)
 * @method static Booking|Proxy                     findOrCreate(array $attributes)
 * @method static Booking|Proxy                     first(string $sortedField = 'id')
 * @method static Booking|Proxy                     last(string $sortedField = 'id')
 * @method static Booking|Proxy                     random(array $attributes = [])
 * @method static Booking|Proxy                     randomOrCreate(array $attributes = [])
 * @method static BookingRepository|RepositoryProxy repository()
 * @method static Booking[]|Proxy[]                 all()
 * @method static Booking[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Booking[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Booking[]|Proxy[]                 findBy(array $attributes)
 * @method static Booking[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Booking[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class BookingFactory extends ModelFactory
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
            'email' => self::faker()->email(),
            'firstname' => self::faker()->firstName(),
            'lastname' => self::faker()->lastName(),
            'reference' => self::faker()->uuid(),
            'schoolClass' => self::faker()->text(6),
            'status' => self::faker()->randomElement(BookingStatus::cases()),
            'workshop' => WorkshopFactory::random(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Booking $booking): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Booking::class;
    }
}

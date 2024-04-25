<?php

enum WorkshopStatus: string
{
    case HIDDEN = 'hidden'; // Réservation fermées

    case BOOKING = 'booking'; // Réservations ouvertes
    case CLOSED = 'closed'; // Réservations terminées
    case FINISHED = 'finished'; // Atelier terminé
    case CANCELED = 'canceled'; // Atelier annulé
}

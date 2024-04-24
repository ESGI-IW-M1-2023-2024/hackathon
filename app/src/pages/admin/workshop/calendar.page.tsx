import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import {EventClickArg, EventSourceInput} from "@fullcalendar/core"; // a plugin!
import { useGetWorkshopsQuery } from "@/redux/api/api.slice";
import {Button, LinearProgress, Modal, Typography} from "@mui/material";
import { useState } from 'react';
import {Workshop} from "@/features/admin/types/workshop.types";
import { useTheme } from '@mui/material';

const WorkshopCalendar = () => {

  const { data, isLoading } = useGetWorkshopsQuery();
  const [modalOpen, setModalOpen] = useState(false); // State to handle modal visibility
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop|undefined>(undefined); // State to hold the clicked workshop's data
  const {palette} = useTheme();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleEventClick = (arg :  EventClickArg) => {
    setSelectedWorkshop(data?.items.find((item) => item.id.toString() === arg.event.id));
    setModalOpen(true); // Open modal on event click
  };

  if (isLoading) {
    return <LinearProgress />;
  }


  const events: EventSourceInput |undefined = data?.items.map((item) => ({
    id: item.id.toString(),
    start: item.dateStart,
    title: item.theme.label
  }));

  const transformDate = (date: string) => {
    return new Date(date).toLocaleString();
  }

  const modalContent = modalOpen && (
    <Modal open={modalOpen} onClose={handleClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
        <Typography variant={'h2'}>{selectedWorkshop ? selectedWorkshop.theme.label : undefined}</Typography>
        <p>{selectedWorkshop ? 'Date : ' + transformDate(selectedWorkshop.dateStart.toString()) : undefined}</p>
        <p>{selectedWorkshop ? `Durée : ${Math.round(selectedWorkshop.length/60)}h et ${selectedWorkshop.length%60}min` : undefined}</p>
        <p>{selectedWorkshop ? 'Lieu : ' + selectedWorkshop.location : undefined}</p>
        <Button variant={"contained"}>Accéder à l'atelier // TODO : Add a button to redirect to the workshop's page</Button>
      </div>
    </Modal>
  );

  return (
    <>
      {modalContent}
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        locale={'fr'}
        eventColor={palette.secondary.main}
        buttonText={{
          today:    'Aujourd\'hui',
          month:    'Mois',
          week:     'Semaine',
          day:      'Jour',
          list:     'Liste'
        }}
      />
    </>
  )
};

export default WorkshopCalendar;

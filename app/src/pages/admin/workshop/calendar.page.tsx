import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import {EventClickArg} from "@fullcalendar/core"; // a plugin!
import {Button, Container, Modal, Typography} from "@mui/material";
import {useEffect, useState} from 'react';
import {Workshop} from "@/features/admin/types/workshop.types";
import { useTheme } from '@mui/material';

const WorkshopCalendar = () => {

  const [modalOpen, setModalOpen] = useState(false); // State to handle modal visibility
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop|undefined>(undefined); // State to hold the clicked workshop's data
  const {palette} = useTheme();
  let workshops : Workshop[] = []
  // const [currentDateRange, setCurrentDateRange] = useState<CalendarParams>({ start: null, end: null });

  useEffect(() => {
    console.log('WorkshopCalendar mounted');
  }, []);

  // const { data, isLoading, isError, error, refetch} = useGetWorkshopsForCalendarQuery(currentDateRange);
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleEventClick = (arg :  EventClickArg) => {
    setSelectedWorkshop(workshops?.find((item : Workshop) => item.id.toString() === arg.event.id));
    setModalOpen(true); // Open modal on event click
  };

  // if (isLoading) {
  //   return <LinearProgress />;
  // }


  // const events: EventSourceInput |undefined = data?.items.map((item) => ({
  //   id: item.id.toString(),
  //   start: item.dateStart,
  //   title: item.theme.label
  // }));

  const transformDate = (date: string) => {
    return new Date(date).toLocaleString();
  }

  const modalContent = modalOpen && (
    <Modal open={modalOpen} onClose={handleClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
        <Typography variant={'h2'}>{selectedWorkshop ? selectedWorkshop.theme.label : undefined}</Typography>
        <p>{selectedWorkshop ? 'Date : ' + transformDate(selectedWorkshop.dateStart.toString()) : undefined}</p>
        <p>{selectedWorkshop ? `Durée : ${Math.trunc(selectedWorkshop.length/60)}h et ${selectedWorkshop.length%60}min` : undefined}</p>
        <p>{selectedWorkshop ? 'Lieu : ' + selectedWorkshop.location : undefined}</p>
        <Button variant={"contained"}>Accéder à l'atelier // TODO : Add a button to redirect to the workshop's page</Button>
      </div>
    </Modal>
  );

  return (
    <>
      <Typography variant={'h1'} className={'title-calendar'}>Calendrier des ateliers</Typography>
      {modalContent}
      <Container style={{marginBottom: '2rem', zIndex:"0"}}>
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          weekends={true}
          eventSources={
            [
              {
                url: `${import.meta.env.VITE_API_BASE_URL}/workshops/calendar`,
                success: (data) => {
                  console.log(data);
                  workshops = data;
                },
                eventDataTransform: (data) => {
                  return {
                    id: data?.id?.toString(),
                    start: data.dateStart,
                    title: data.theme.label
                  };
                }
              }
            ]
          }
          lazyFetching={true}
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
      </Container>
    </>
  )
};

export default WorkshopCalendar;

import { Router, Response, Request } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request: Request, response: Response) => {
  const appointments = appointmentsRepository.all();

  return response.status(200).json(appointments);
})

appointmentsRouter.post('/', (request: Request, response: Response) => {

  try {
    const { provider, date } = request.body;
  
    const parsedDate = parseISO(date);
  
    const createAppointment = new CreateAppointmentService(appointmentsRepository);
  
    const appointment = createAppointment.execute({date: parsedDate, provider});
  
    return response.status(200).json(appointment);

  } catch (error) {
    
    return response.status(400).json({
      error: error.message
    })
  }
})

export default appointmentsRouter;
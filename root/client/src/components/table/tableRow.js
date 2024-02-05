import { React} from 'react';
import { TimeSlot } from './timeslot';

export const TableRow = ({week, hour, duration, setPollAvailabilities, pollAvailabilities }) => {
  const tRow = Object.keys(week).map((weekDay, idx) => {
    return (
      <td className='cell-time-slot' key={idx} date-weekday={week[weekDay]}>
        <TimeSlot week={week} hour={hour} date={new Date(week[weekDay]).toISOString().slice(0, 10)} startTime={`${hour.toString().length === 1 ? `0${hour.toString()}` : hour.toString()}:00`} duration={duration} setPollAvailabilities={setPollAvailabilities} pollAvailabilities={pollAvailabilities} />
        <TimeSlot week={week} hour={hour} date={new Date(week[weekDay]).toISOString().slice(0, 10)} startTime={`${hour.toString().length === 1 ? `0${hour.toString()}` : hour.toString()}:15`} duration={duration} setPollAvailabilities={setPollAvailabilities} pollAvailabilities={pollAvailabilities} />
        <TimeSlot week={week} hour={hour} date={new Date(week[weekDay]).toISOString().slice(0, 10)} startTime={`${hour.toString().length === 1 ? `0${hour.toString()}` : hour.toString()}:30`} duration={duration} setPollAvailabilities={setPollAvailabilities} pollAvailabilities={pollAvailabilities} />
        <TimeSlot week={week}hour={hour} date={new Date(week[weekDay]).toISOString().slice(0, 10)} startTime={`${hour.toString().length === 1 ? `0${hour.toString()}` : hour.toString()}:45`} duration={duration} setPollAvailabilities={setPollAvailabilities} pollAvailabilities={pollAvailabilities} />
      </td>
    );
  });
  return tRow;
}
import { useEffect, useState } from 'react';
// import { Activity, getActivities } from '../../../store/reducers/activities';
import { useAppDispatch } from '../../../hooks/redux';
import { getAllTravels } from '../../../store/reducers/travels';
import DayByDayMain from './DayByDayMain';

function AllActivities() {
  // const [activities, setActivities] = useState<Activity[]>([]);
  // useEffect(() => {
  //   getActivities().then((data: any) => {
  //     setActivities(data);
  //   });
  // }, []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTravels());
  }, [dispatch]);

  return <DayByDayMain />;
}

export default AllActivities;

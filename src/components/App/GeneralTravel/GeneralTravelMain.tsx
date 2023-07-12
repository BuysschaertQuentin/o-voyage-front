import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../hooks/redux';
import { getActivityByDate } from '../../../store/reducers/activities';
import AddActivitiesTable from '../DayByDay/ButtonAddActivitiesList';

function GeneralTravelMain() {
  const [activities, setActivities] = useState([]);
  const dispatch = useAppDispatch();
  const voyageId = Number(useParams().voyage);
  const date = useParams().jour;
  useEffect(() => {
    getActivityByDate({
      date: dayjs(date).format('YYYY-MM-DD'),
      travelId: voyageId,
    }).then((res) => {
      setActivities(res);
    });
  }, [dispatch, voyageId, date]);

  return (
    <div className="flex w-full sm:flex-col space-x-1">
      <div className="flex md:flex-row w-full sm:flex-col">
        {/* contenant les activités du voyage */}

        <div className="flex flex-1 flex-col md:w-1/3 sm:w-full m-2">
          {' '}
          {/* récupérer les données de la base de données  pour faire le nombre de bulles relatives au activités dans l'ordre d'arrivée */}
          {activities && activities.length > 0 ? (
            activities.map((activity: any) => (
              <div
                key={activity.id}
                className="grid h-20 card bg-lightest-400 rounded-box place-items-center m-1"
              >
                {activity.name}
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col items-center bg-lightest rounded-md p-2 text-darkest text-xl overflow-hidden justify-center mb-10">
                Il est l'heure de commencer à prévoir vos prochaines activités !
              </div>
              <AddActivitiesTable />
            </>
          )}
        </div>

        {/* contenant les prochaines étapes du voyage */}

        <div>
          {' '}
          {/* récupérer les données de la base de données  pour faire le nombre de bulles relatives aux prochaines étapes (itinéraires) du voyage */}
          {activities && activities.length > 0
            ? activities.map((activity: any) => (
                <div
                  key={activity.id}
                  className="grid h-20 card bg-lightest-400 rounded-box place-items-center m-1"
                >
                  {activity.location}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default GeneralTravelMain;

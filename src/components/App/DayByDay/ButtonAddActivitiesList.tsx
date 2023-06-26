import { useState } from 'react';

type ListItem = {
  title: string;
  location: string;
  price: number;
  members: number;
  time: string;
  date: string;
};

function AddActivitiesTable() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [members, setMembers] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [listItems, setListItems] = useState<ListItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: ListItem = {
      title,
      location,
      price,
      members,
      time,
      date,
    };

    setListItems([...listItems, newItem]);
    setTitle('');
    setLocation('');
    setPrice('');
    setMembers('');
    setTime('');
    setDate('');
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="card bg-lightest shadow-xl flex items-center justify-center">
        <div className="card-body grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <input
                type="text"
                required
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Titre de l'activité"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                required
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Lieu"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                id="members"
                value={members}
                onChange={(e) => setMembers(Number(e.target.value))}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Nombre de participants"
              />
            </div>
            <div className="mb-4">
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Heure"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Date"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2 border border-darkest-300 rounded-md"
                placeholder="Prix"
              />
            </div>
            <button
              type="submit"
              className="btn btn-darkest bg-darkest text-lightest w-full hover:bg-lightest hover:text-darkest"
            >
              Ajouter une activité
            </button>
          </form>
        </div>
      </div>
      <div />
      <ol className="flex flex-wrap">
        {listItems.map((item, index) => (
          <li key={index} className="card">
            <div className="relative bg-lightest-200 py-6 px-6 rounded-md w-64 my-4 mx-4 shadow-xl">
              <div className=" text-white flex items-center absolute rounded-2xl py-4 px-4 shadow-xl bg-darkest left-4 -top-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="white"
                >
                  <path d="M303.077-104.923v-357.692q-45.654-6.462-77.596-41.481-31.943-35.019-31.943-85.314v-266.282h36.924v266.153h72.615v-266.153H340v266.153h72v-266.153h36.923v266.282q0 50.295-31.634 85.314-31.635 35.019-77.289 41.481v357.692h-36.923Zm363.692 0v-317.538h-96v-255.693q0-64.963 35.885-115.828 35.885-50.864 97.039-59.557v748.616h-36.924Z" />
                </svg>
              </div>
              <div className="mt-8">
                <p className="text-xl font-semibold my-2">{item.title}</p>
                <div className="flex space-x-2 text-darkest-400 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>{item.location}</p>
                </div>
                <div className="flex space-x-2 text-darkest-400 text-sm my-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>{item.date}</p>
                </div>
                <div className="border-t-2" />

                <div className="flex justify-between">
                  <div className="my-2">
                    <p className="font-semibold text-base mb-2">Participants</p>
                    <div className="flex space-x-2">{item.members}</div>
                  </div>
                  <div className="my-2">
                    <p className="font-semibold text-base mb-2">Prix</p>
                    <div className="text-base text-darkest-400 font-semibold">
                      <p>{item.price} € </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AddActivitiesTable;

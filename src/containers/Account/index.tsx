import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';
import { listAccounts } from '../../services';
import { AccountGroups, ResponseError } from '../../services/models';

interface AccountGroup {
  id: number;
  name: string;
}

interface HistoryStateProps {
  usr: {
    id: number | undefined;
  };
}

const Account = () => {
  const [accountGrupo, setAccountGroup] = useState<AccountGroup[]>([]);
  const token = useRecoilValue(auth_token);

  let { name } = useParams();
  let {
    usr: { id },
  } = history.state as HistoryStateProps;

  if (!id) {
    console.log('by name ' + name);
  } else {
    console.log('by id ' + id);
  }

  useEffect(() => {
    const fetchData = async () => {
      let result = await listAccounts(token);
      if ('items' in result) {
        setAccountGroup((result as AccountGroups).items);
      } else {
        alert(result as ResponseError);
      }
    };

    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const elements = accountGrupo.map((e) => (
    <Link
      to={`/group/${e.name}`}
      state={{ id: e.id }}
      className="
            text-center
            inline-block
            px-7 py-3
            disabled:bg-slate-600
            bg-blue-600
            text-white
            font-medium text-sm leading-snug uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition duration-150 ease-in-out
            w-full
          "
      key={e.id}
    >
      {e.name}
    </Link>
  ));

  return (
    <>
      <header className="bg-white shadow">
        <div className="flex justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <button
            type="button"
            className="
            inline-block
            px-5 py-3
            disabled:bg-slate-600
            bg-blue-600
            text-white
            font-medium text-sm leading-snug uppercase
            rounded-full
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition duration-150 ease-in-out
          "
          >
            +
          </button>
        </div>
      </header>
      <main className="flex-grow">
        <div
          className="
              grid
              grid-cols-2
              md:grid-cols-4
              lg:grid-cols-6
              xl:grid-cols-8
              lx:grid-cols-12
              gap-4
              p-5
            "
        >
          {elements}
        </div>
      </main>
    </>
  );
};

export default Account;

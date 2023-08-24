import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Components/Board/Board';
import { CheckCircle, AlertCircle, Clock, Circle, XCircle, Sliders, User, Star, MoreHorizontal, Flag } from 'react-feather';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [apiData, setApiData] = useState([]);
  const [groupingOption, setGroupingOption] = useState(() => localStorage.getItem('groupingOption') || 'By Status');
  const [orderingOption, setOrderingOption] = useState(() => localStorage.getItem('orderingOption') || 'Priority');

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setApiData(data.tickets);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('orderingOption', orderingOption);
  }, [groupingOption, orderingOption]);


  const sortTickets = (tickets) => {
    if (orderingOption === 'Priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (orderingOption === 'Title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const handleGroupingChange = (event, data) => {
    setGroupingOption(data.value);
  };

  const handleOrderingChange = (event, data) => {
    setOrderingOption(data.value);
  };


  let groupedAndSortedData = apiData;

  if (groupingOption === 'By User') {
    groupedAndSortedData = apiData.reduce((groupedData, ticket) => {
      const userKey = ticket.userId;

      if (!groupedData[userKey]) {
        groupedData[userKey] = [];
      }

      groupedData[userKey].push(ticket);
      return groupedData;
    }, {});
  }
  else if (groupingOption === 'By Priority') {
    groupedAndSortedData = apiData.reduce((groupedData, ticket) => {
      const priorityKey = ticket.priority;

      if (!groupedData[priorityKey]) {
        groupedData[priorityKey] = [];
      }
      groupedData[priorityKey].push(ticket);
      return groupedData;
    }, {});
  }
  else if (groupingOption === 'By Status') {
    groupedAndSortedData = apiData.reduce((groupedData, ticket) => {
      const statusKey = ticket.status;

      if (!groupedData[statusKey]) {
        groupedData[statusKey] = [];
      }
      groupedData[statusKey].push(ticket);
      return groupedData;
    }, {});
  }

  return (
    <div className="app">
      <div className='app_navbar'>
        <Sliders />
        <Dropdown text={`Display (${groupingOption} / ${orderingOption})`} className="dropdown-option">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Dropdown text='Grouping'>
                <Dropdown.Menu>
                  <Dropdown.Item text='By Status' onClick={() => handleGroupingChange(null, { value: 'By Status' })} />
                  <Dropdown.Item text='By User' onClick={() => handleGroupingChange(null, { value: 'By User' })} />
                  <Dropdown.Item text='By Priority' onClick={() => handleGroupingChange(null, { value: 'By Priority' })} />
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown text='Ordering'>
                <Dropdown.Menu>
                  <Dropdown.Item text='Priority' onClick={() => handleOrderingChange(null, { value: 'Priority' })} />
                  <Dropdown.Item text='Title' onClick={() => handleOrderingChange(null, { value: 'Title' })} />
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='app_outer'>
        <div className='app_boards'>
          {groupingOption === 'By User' && (
            Object.entries(groupedAndSortedData).map(([userId, userTickets]) => (
              <Board key={userId} title={`${userId}`} icon={<User />} tickets={sortTickets(userTickets)} />
            ))
          )}

          {groupingOption === 'By Priority' && (
            <>
              <Board title="No Priority" icon={<MoreHorizontal className="icon-more" />} tickets={sortTickets(groupedAndSortedData['0'] || [])} />
              <Board title="Urgent" icon={<AlertCircle className="icon-alertcircle" />} tickets={sortTickets(groupedAndSortedData['4'] || [])} />
              <Board title="High" icon={<Flag className="icon-flag" />} tickets={sortTickets(groupedAndSortedData['3'] || [])} />
              <Board title="Medium" icon={<Flag className="icon-flag2" />} tickets={sortTickets(groupedAndSortedData['2'] || [])} />
              <Board title="Low" icon={<Flag className="icon-flag3" />} tickets={sortTickets(groupedAndSortedData['1'] || [])} />
            </>
          )}

          {groupingOption === 'By Status' && (
            <>
              <Board title="To Do" icon={<Circle className="icon-circle" />} tickets={sortTickets(groupedAndSortedData['Todo'] || [])} />
              <Board title="In Progress" icon={<Clock className="icon-clock" />} tickets={sortTickets(groupedAndSortedData['In progress'] || [])} />
              <Board title="Backlog" icon={<AlertCircle className="icon-alert" />} tickets={sortTickets(groupedAndSortedData['Backlog'] || [])} />
              <Board title="Done" icon={<CheckCircle className="icon-check" />} tickets={sortTickets(groupedAndSortedData['Done'] || [])} />
              <Board title="Canceled" icon={<XCircle className="icon-cancel" />} tickets={sortTickets(groupedAndSortedData['Cancled'] || [])} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

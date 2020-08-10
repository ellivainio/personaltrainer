import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
          .then(response => response.json())
          .then(data => setCustomers(data.content))
          .catch(err => console.error(err));
      };

    const deleteCustomer = link => {
      if (window.confirm('Are you sure you want to delete customer?')) {
      fetch(link, { method: 'DELETE' })
        .then(res => fetchCustomers())
        .catch(err => console.error(err));
      }
  };

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
           },
           body: JSON.stringify(customer) 
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err));
    }
    
    const updateCustomer = (customer, link) => {
        fetch(link, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
        })
          .then(response => fetchCustomers())
          .catch(err => console.error(err));
      };
    
    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(_ => fetchCustomers())
        .then(_ => {
            setOpen(true);
        })
        .catch(err => console.log(err))
    }

    const columns = [
          {
            Header: 'Firstname',
            accessor: 'firstname'
          },
          {
            Header: 'Lastname',
            accessor: 'lastname'
          },
          {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
          },
          {
            Header: 'Postcode',
            accessor: 'postcode'
          },
          {
            Header: 'City',
            accessor: 'city'
          },
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Phone',
            accessor: 'phone'
          },
          {
            sortable: false,
            filterable: false,
            width: 160,
            Cell: row => <Addtraining customerTraining={row.original.links[0].href} addTraining={addTraining} key={row.original.links[0].href}/>
        },
          {
              sortable: false,
              filterable: false,
              width: 100,
              Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original}/>
          },
          {
              sortable: false,
              filterable: false,
              width: 100,
              accessor: '_links.self.href',
              Cell: row => <Button size="small" color="secondary" onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</Button>
          },
    ]

    return (
        <div>
            <Addcustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment-with-locales-es6';
import Button from '@material-ui/core/Button';


export default function Traininglist() {

    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect (() => {
        getTraining();
    }, [])

    const getTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTraining(data)
            })
        .catch(err => console.error(err))
    }

    const deleteTraining = (row) => {
        console.log(row)
        if (window.confirm('Are you sure?')){
        setTraining(training.filter((training, index) => index !== row))};
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    
    const columns = [
        {
            Header: 'Date',
            id: 'date',
            accessor: date => {
            return moment(date.date).format('L LT')}
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            id: 'customerid',
            Header: 'Customer',
            accessor: 'customer.firstname'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: row => <Button color="secondary" onClick={() => deleteTraining(row.index)}>Delete</Button>
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={training} columns={columns}/>
        </div>
    );
}
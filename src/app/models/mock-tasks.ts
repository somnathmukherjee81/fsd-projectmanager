import { Task } from './task';
import moment from 'moment/src/moment';

const localMoment = moment;
localMoment.locale('en');

export const TASKS: Task[] = [
    {
        $id: '14',
        taskID: 1,
        summary: 'Mock - Implement Channel Service',
        description: 'Implement Channel Service for the feature which will invoke the factories',
        startDate: '2018-07-02T00:00:00',
        endDate: '2018-07-06T00:00:00',
        priority: 3,
        status: 0
    },
    {
        $id: '15',
        taskID: 2,
        summary: 'Mock - Implement Front End Service',
        description: 'Implement Front End Service for the feature which will invoke the Channel Service',
        startDate: '2018-07-09T00:00:00',
        endDate: '2018-07-13T00:00:00',
        priority: 3,
        status: 0
    },
    {
        $id: '16',
        taskID: 3,
        summary: 'Mock - Implement Front End',
        description: 'Implement Front End for the feature which will invoke the Front End Service',
        startDate: '2018-07-16T00:00:00',
        endDate: '2018-07-20T00:00:00',
        priority: 3,
        status: 0
    },
    {
        $id: '17',
        taskID: 4,
        parentID: 1,
        summary: 'Mock - Create Channel Service Repository'
    },
    {
        $id: '18',
        taskID: 5,
        parentID: 1,
        summary: 'Mock - Create ASP.Net Core WebApi for Channel Service'
    },
    {
        $id: '19',
        taskID: 6,
        parentID: 1,
        summary: 'Mock - Create CI/CD pipeline for Channel Service'
    },
    {
        $id: '20',
        taskID: 7,
        parentID: 2,
        summary: 'Mock - Create Front End Service Repository'
    },
    {
        $id: '21',
        taskID: 8,
        parentID: 2,
        summary: 'Mock - Create Node.js service for Front End Service'
    },
    {
        $id: '22',
        taskID: 9,
        parentID: 2,
        summary: 'Mock - Create CI/CD pipeline for Front End Service'
    },
    {
        $id: '23',
        taskID: 10,
        parentID: 3,
        summary: 'Mock - Create Front End Repository'
    },
    {
        $id: '24',
        taskID: 11,
        parentID: 3,
        summary: 'Mock - Create React/Redux Implementation of the Front End'
    },
    {
        $id: '25',
        taskID: 12,
        parentID: 3,
        summary: 'Mock - Create CI/CD pipeline for Front End'
    },
    {
        $id: '26',
        taskID: 14,
        summary: 'Mock - Create Release Definitions',
        description: 'Create Release Definitions in Microsoft Azure',
        startDate: '2018-07-23T00:00:00',
        endDate: '2018-07-27T00:00:00',
        priority: 3,
        status: 0
    }
];

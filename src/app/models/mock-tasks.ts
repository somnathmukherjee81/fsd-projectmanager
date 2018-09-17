import { Task } from './task';

export const TASKS: Task[] = [
    {
        $id: '14',
        taskId: 1,
        summary: 'Mock - Implement Channel Service',
        description: 'Implement Channel Service for the feature which will invoke the factories',
        startDate: '2018-07-02T00:00:00',
        endDate: '2018-07-06T00:00:00',
        priority: 3,
        status: 'NotStarted',
        projectId: 1
    },
    {
        $id: '15',
        taskId: 2,
        summary: 'Mock - Implement Front End Service',
        description: 'Implement Front End Service for the feature which will invoke the Channel Service',
        startDate: '2018-07-09T00:00:00',
        endDate: '2018-07-13T00:00:00',
        priority: 3,
        status: 'NotStarted',
        projectId: 1
    },
    {
        $id: '16',
        taskId: 3,
        summary: 'Mock - Implement Front End',
        description: 'Implement Front End for the feature which will invoke the Front End Service',
        startDate: '2018-07-16T00:00:00',
        endDate: '2018-07-20T00:00:00',
        priority: 3,
        status: 'NotStarted',
        projectId: 1
    },
    {
        $id: '17',
        taskId: 4,
        parentId: 1,
        summary: 'Mock - Create Channel Service Repository',
        projectId: 1
    },
    {
        $id: '18',
        taskId: 5,
        parentId: 1,
        summary: 'Mock - Create ASP.Net Core WebApi for Channel Service',
        projectId: 1
    },
    {
        $id: '19',
        taskId: 6,
        parentId: 1,
        summary: 'Mock - Create CI/CD pipeline for Channel Service',
        projectId: 1
    },
    {
        $id: '20',
        taskId: 7,
        parentId: 2,
        summary: 'Mock - Create Front End Service Repository',
        projectId: 1
    },
    {
        $id: '21',
        taskId: 8,
        parentId: 2,
        summary: 'Mock - Create Node.js service for Front End Service',
        projectId: 1
    },
    {
        $id: '22',
        taskId: 9,
        parentId: 2,
        summary: 'Mock - Create CI/CD pipeline for Front End Service',
        projectId: 1
    },
    {
        $id: '23',
        taskId: 10,
        parentId: 3,
        summary: 'Mock - Create Front End Repository',
        projectId: 1
    },
    {
        $id: '24',
        taskId: 11,
        parentId: 3,
        summary: 'Mock - Create React/Redux Implementation of the Front End',
        projectId: 1
    },
    {
        $id: '25',
        taskId: 12,
        parentId: 3,
        summary: 'Mock - Create CI/CD pipeline for Front End',
        projectId: 1
    },
    {
        $id: '26',
        taskId: 14,
        summary: 'Mock - Create Release Definitions',
        description: 'Create Release Definitions in Microsoft Azure',
        startDate: '2018-07-23T00:00:00',
        endDate: '2018-07-27T00:00:00',
        priority: 3,
        status: 'NotStarted',
        projectId: 1
    }
];

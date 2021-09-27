'strict';

const EventLog = [
    {events: ["pizza","reading", "beer", "work", "laptop"], warewolf: false},
    {events: ["work", "sleep", "pizza", "laptop", "beer"], warewolf: false},
    {events: ["pizza", "ice-cream", "work", "playing game"], warewolf: false},
    {events: ["work", "playing game", "pizza", "sleep"], warewolf: false},
    {events: ["work", "coffee", "reading", "pizza"], warewolf: true},
    {events: ["work", "playing game", "beer", "sleep"], warewolf: false},
    {events: ["pizza", "ice-cream", "work", "playing game"], warewolf: false},
    {events: ["ice-cream", "chips", "beer", "work", "playing game"], warewolf: false},
    {events: ["beer", "reading", "pizza", "laptop", "sleep"], warewolf: false},
    {events: ["pizza", "coffee", "chips", "work"], warewolf: true},
    {events: ["sleep", "ice-cream", "work", "laptop", "beer"], warewolf: false},
    {events: ["work", "ice-cream", "playing game", "chips"], warewolf: false},
    {events: ["pizza", "playing game", "chips", "ice-cream"], warewolf: false},
    {events: ["pizza", "beer", "work", "ice-cream"], warewolf: false},
    {events: ["laptop", "coffee", "work", "pizza"], warewolf: true},
    {events: ["beer", "work", "pizza", "playing game", "ice-cream"], warewolf: false},
    {events: ["work", "sleep", "playing game", "ice-cream", "beer"], warewolf: false},
    {events: ["laptop", "beer", "work", "chips"], warewolf: false},
    {events: ["playing game", "coffee", "work", "pizza"], warewolf: true},
    {events: ["playing game", "work", "laptop", "sleep"], warewolf: false},
 ]

/**
 * 
 * @param {*} activities - array of events
 * @param {*} events  get unique item from  events array
 * @returns events
 */
const activityEvents = (activities, events = []) => {
    activities.forEach(activity => activity.events.forEach(event =>  {
        if (!events.includes(event)) events.push(event) 
    }))
    return events;
} 

/**
 * 
 * @param {boolean} warewolf - boolean
 * @param {string} event - string
 * @returns string
 */
const relatinship = (warewolf, event) => {
    const activityResult = warewolf == true ? `${event} will completly turn you to a warewolf` : 
    `${event} can not make you turn warewolf maybe a zombie`
    return activityResult
 }

/**
 * 
 * @param {*} events - array of string containg event
 * @param {*} activities variable
 * @returns array of objects
 */
 const activityLogs =  (events = activityEvents(EventLog), activities) => {
     activities = events.map(event => {
         for (let activity of EventLog) {
             if (activity.events.includes(event)) return {event, warewolf: relatinship(activity.warewolf, event)}
         }
     })
     return activities;
 }
    // log app
console.table(activityLogs())





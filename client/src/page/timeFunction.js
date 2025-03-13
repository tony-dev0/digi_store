// @ts-nocheck
export const data = [
    {
    title: "Account has been suspended",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa itaque officia alias, quisquam odit natus nulla magni maxime rem.Expedita blanditiis magnam rerum error, ipsa voluptate nesciunt deserunt recusandae corrupti!",
    icon:"warning", 
    time:"11 mins ago",
    date:"05/2/2023",
},
    {
        title: "Verification is successfull",
        body: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa itaque officia alias, quisquam odit natus nulla magni maxime rem.Expedita blanditiis magnam rerum error, ipsa voluptate nesciunt deserunt recusandae corrupti!",
        icon:"success",
        time:"30 mins ago",
        date:"06/2/2023",
    },
    {
        title: "Account has been suspended",
        body: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa itaque officia alias, quisquam odit natus nulla magni maxime rem.Expedita blanditiis magnam rerum error, ipsa voluptate nesciunt deserunt recusandae corrupti!",
        icon:"warning",
        time:"5hrs ago",
        date:"05/2/2023",
    },
    {
        title: "Account has been banned",
        body: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa itaque officia alias, quisquam odit natus nulla magni maxime rem.Expedita blanditiis magnam rerum error, ipsa voluptate nesciunt deserunt recusandae corrupti!",
        icon:"danger",
        time:"2 days",
        date:"05/2/2023",
    }
];
export const dateFormat = (eventDate) => {
  const date = new Date(Number(eventDate));
  return date.toLocaleDateString("en-GB");
}
export const timeDifference = (pastDate) => {
    const now = new Date();
    const differenceInSeconds = Math.floor((now - pastDate) / 1000);

    if (differenceInSeconds < 60) {
        if (differenceInSeconds == 1) {
            return `${differenceInSeconds} second ago`;
        }
        return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        if (minutes == 1) {
            return `${minutes} minute ago`;
        }
        return `${minutes} minutes ago`;
    } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        if (hours == 1) {
            return `${hours} hour ago`;
        }
        return `${hours} hours ago`;
    } else if (differenceInSeconds < 2592000) { // Less than 30 days
        const days = Math.floor(differenceInSeconds / 86400);
        if (days == 1) {
            return `${days} day ago`;
        }
        return `${days} days ago`;
    } else {
        const months = Math.floor(differenceInSeconds / 2592000);
        if (months == 1) {
            return `${months} month ago`;
        }
        return `${months} months ago`;
    }
};
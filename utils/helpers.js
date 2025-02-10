import moment from 'moment';


export const PassengersTitle = [
    {value: 'Mr', label: 'Mr'},
    {value: 'Ms', label: 'Ms'},
]

export const FlightTypes = [
    {
        label: "Round Trip",
        value: "1"
    },
    {
        label: "One Way",
        value: "0"
    },
    {
        label: "Multi City",
        value: "2"
    }
]
export const CabinTypes = [
    {
        label: "First",
        value: "First"
    },
    {
        label: "Business",
        value: "Business"
    },
    {
        label: "Economy",
        value: "Economy"
    },
]

export const PassengersTypes = [
    {
        type:"ADT",
        icon:"ph:user",
        min:1,
        value:"adt",
        defaultValue:1
    },
    {
        type:"CHD",
        icon:"la:child",
        min:0,
        value:"chd",
        defaultValue:0
    },
    {
        type:"INF",
        icon:"healthicons:baby-0306m",
        min:0,
        value:"inf",
        defaultValue:0
    }
]

export const generateTraceId = (length = 16) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        result += charset[randomIndex];
    }

    return result;
}

export const mainSearchPayload = (payload)=>{
    let reashapeOpject = {}
    let {date , ...restPayload} = payload
    if(payload.search_type === "1"){
        reashapeOpject = {
            ...restPayload,
            legs:[
                {
                    from: payload.from,
                    to: payload.to,
                    date: payload.date[0]
                },
                {
                    from: payload.to,
                    to: payload.from,
                    date: payload.date[1]
                }
            ]
        }
    } else if (payload.search_type === "0"){
        reashapeOpject = {
            ...restPayload,
            legs:[
                {
                    from: payload.from,
                    to: payload.to,
                    date: payload.date[0]
                },
            ]
        }
    }else if (payload.search_type === "2"){
        reashapeOpject = {
            ...restPayload,
        }
    }
    return {
        q:JSON.stringify(reashapeOpject),
        payload:reashapeOpject
    }

}

export const disablePreviousDate = (ts) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return ts < currentDate.getTime();
}

export const activeSelect = (id) => {
    document.querySelector(`#${id} input`).click()
}

export const formatDate = (value , format = 'D/M/YYYY a h:mm:ss')=>{
    return moment(value).locale('ar').format(format)
}

export const formatDuration = (value , format = 'D/M/YYYY a h:mm:ss')=>{
    const duration = moment.duration(value, 'minutes');

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    let formattedDuration = '';
    if (format.includes('h')) {
        formattedDuration += hours > 0 ? `${hours}h ` : '';
    }
    if (format.includes('m')) {
        formattedDuration += minutes > 0 ? `${minutes}m` : '';
    }
    return formattedDuration.trim();

}

export const reshapeFilterKey = (array)=>{
    let newDate = ''
    array.map(item=>{
        newDate+=`${item}|`
    })
    return newDate.slice(0,newDate.length-1)
}

export const debounce = (fn, delay ,searchTimeout) => {
    return function (...args) {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = window.setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

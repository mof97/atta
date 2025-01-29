import axios from "axios";
import {mainSearchPayload} from "~/utils/helpers.js";
export const useSearch = defineStore('Search', () => {
    const search_id=ref(null)
    const trace_id=ref(null)
    const result_id=ref(null)
    const filters = ref(
        {
            "price_range": {
                "title": "Price Range",
                "min": 339.1,
                "max": 1105.7,
                "currency": "USD",
                "type": "range"
            },
            "commission_range": {
                "title": "Commission Range",
                "max": 76.5,
                "type": "range"
            },
            "stops": {
                "title": "Stops",
                "value": [
                    {
                        "name": "Direct",
                        "value": 0
                    },
                    {
                        "name": "1 Stop",
                        "value": 1
                    }
                ],
                "type": "checkbox"
            },
            "baggage": {
                "title": "Baggage",
                "value": [
                    {
                        "name": "No Baggage",
                        "value": 0
                    },
                    {
                        "name": "1 PC",
                        "value": 1
                    },
                    {
                        "name": "15 KG",
                        "value": 15
                    },
                    {
                        "name": "20 KG",
                        "value": 20
                    },
                    {
                        "name": "25 KG",
                        "value": 25
                    },
                    {
                        "name": "30 KG",
                        "value": 30
                    }
                ],
                "type": "checkbox"
            },
            "airlines": {
                "title": "Airlines",
                "value": [
                    {
                        "code": "FZ",
                        "name": "Fly Dubai",
                        "logo": "https://www.gstatic.com/flights/airline_logos/70px/FZ.png",
                        "number": 64
                    },
                    {
                        "code": "QR",
                        "name": "Qatar Airways",
                        "logo": "https://www.gstatic.com/flights/airline_logos/70px/QR.png",
                        "number": 39
                    },
                    {
                        "code": "EK",
                        "name": "Emirates",
                        "logo": "https://www.gstatic.com/flights/airline_logos/70px/EK.png",
                        "number": 32
                    },
                    {
                        "code": "RJ",
                        "name": "Royal Jordanian",
                        "logo": "https://www.gstatic.com/flights/airline_logos/70px/RJ.png",
                        "number": 16
                    },
                    {
                        "code": "TK",
                        "name": "Turkish Airlines",
                        "logo": "https://www.gstatic.com/flights/airline_logos/70px/TK.png",
                        "number": 4
                    },
                    {
                        "code": "IA",
                        "name": "Iraqi Airways",
                        "logo": "https://bceprodbucket.s3.eu-central-1.amazonaws.com/airlines/EC6J2HfB1qsZO1Qskj4kd666NxCJ1zCzMd1iQD7I.png",
                        "number": 3
                    },
                    {
                        "code": "G9",
                        "name": "Air Arabia",
                        "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png",
                        "number": 1
                    },
                    {
                        "code": "PC",
                        "name": "Pegasus Airlines",
                        "logo": "https://www.gstatic.com/flights/airline_logos/70px/PC.png",
                        "number": 1
                    }
                ],
                "type": "checkbox"
            },
            "departure_time": {
                "title": "Departure Time",
                "value": [
                    {
                        "name": "Morning",
                        "from": "00:00",
                        "to": "06:00",
                        "value": "morning"
                    },
                    {
                        "name": "Afternoon",
                        "from": "06:00",
                        "to": "12:00",
                        "value": "afternoon"
                    },
                    {
                        "name": "Evening",
                        "from": "12:00",
                        "to": "18:00",
                        "value": "evening"
                    },
                    {
                        "name": "Night",
                        "from": "18:00",
                        "to": "00:00",
                        "value": "night"
                    }
                ],
                "type": "checkbox"
            },
            "arrival_time": {
                "title": "Arrival Time",
                "value": [
                    {
                        "name": "Morning",
                        "from": "00:00",
                        "to": "06:00",
                        "value": "morning"
                    },
                    {
                        "name": "Afternoon",
                        "from": "06:00",
                        "to": "12:00",
                        "value": "afternoon"
                    },
                    {
                        "name": "Evening",
                        "from": "12:00",
                        "to": "18:00",
                        "value": "evening"
                    },
                    {
                        "name": "Night",
                        "from": "18:00",
                        "to": "00:00",
                        "value": "night"
                    }
                ],
                "type": "checkbox"
            },
            "flight_duration": {
                "title": "Flight Duration",
                "min": 165,
                "max": 1520,
                "type": "checkbox"
            },
            "transiting_time": {
                "title": "Transiting Time",
                "min": 45,
                "max": 1420,
                "type": "checkbox"
            },
            "outbound_airports": {
                "title": "Outbound Airports",
                "out_departure_airport": {
                    "title": "Departure Airport",
                    "value": [
                        {
                            "name": "Baghdad International Airport",
                            "code": "BGW",
                            "number": 160
                        }
                    ],
                    "type": "checkbox"
                },
                "out_arrival_airport": {
                    "title": "Arrival Airport",
                    "value": [
                        {
                            "name": "Istanbul Airport",
                            "code": "IST",
                            "number": 90
                        },
                        {
                            "name": "Istanbul Sabiha Gökçen International Airport",
                            "code": "SAW",
                            "number": 70
                        }
                    ],
                    "type": "checkbox"
                }
            },
            "inbound_airports": {
                "title": "Inbound Airports",
                "in_departure_airport": {
                    "title": "Departure Airport",
                    "value": [
                        {
                            "name": "Istanbul Airport",
                            "code": "IST",
                            "number": 102
                        },
                        {
                            "name": "Istanbul Sabiha Gökçen International Airport",
                            "code": "SAW",
                            "number": 58
                        }
                    ],
                    "type": "checkbox"
                },
                "in_arrival_airport": {
                    "title": "Arrival Airport",
                    "value": [
                        {
                            "name": "Baghdad International Airport",
                            "code": "BGW",
                            "number": 160
                        }
                    ],
                    "type": "checkbox"
                }
            }
        }
    )
    const result=ref(
        [
            {
                "trace_id": "sLf7rX1tlHVbhHtQ",
                "search_id": "e2549015-022a-4c35-b5c1-477767d4b2e3",
                "result_id": "fdd271a3-e372-4ef9-bafa-9bff6bbcb46a",
                "universal_key": null,
                "direct_issue": true,
                "is_fast": true,
                "is_best": false,
                "has_baggage": false,
                "supply_provider": "G9",
                "group_id_key": "00000000-0000-0000-0000-000000000000",
                "result_type": 0,
                "search_type": "1",
                "keys": null,
                "price": {
                    "total": 597.32,
                    "base": 597.32,
                    "taxes": 0,
                    "currency": "USD"
                },
                "commission": {
                    "type": "",
                    "amount": 0,
                    "currency": "",
                    "ref": 0,
                    "ref_value": ""
                },
                "service_charge": null,
                "plating_carrier": {
                    "code": "G9",
                    "name": "Air Arabia",
                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                },
                "class": {
                    "service": "Economy",
                    "booking": "Y",
                    "seats_available": 137,
                    "fare_basis": ""
                },
                "price_solution_key": "",
                "directions": [
                    {
                        "from": {
                            "code": "BGW",
                            "name": "Baghdad International Airport",
                            "is_main": false,
                            "city_code": "",
                            "city_name": "Baghdad",
                            "country_name": "Iraq",
                            "longitude": "44.23285",
                            "latitude": "33.2585",
                            "utc": "+03:00",
                            "timezone": "Asia/Baghdad",
                            "type": "airport"
                        },
                        "to": {
                            "code": "IST",
                            "name": "Istanbul Airport",
                            "is_main": false,
                            "city_code": "IST",
                            "city_name": "Istanbul",
                            "country_name": "Turkey",
                            "longitude": "28.74113893066408",
                            "latitude": "41.275873982430916",
                            "utc": "+03:00",
                            "timezone": "Europe/Istanbul",
                            "type": "airport"
                        },
                        "plating_carrier": {
                            "code": "G9",
                            "name": "Air Arabia",
                            "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                        },
                        "departure": {
                            "formated_time": "2025-02-20 17:25:00",
                            "timestamp": 1740072300,
                            "original": "2025-02-20T17:25:00"
                        },
                        "arrival": {
                            "formated_time": "2025-02-21 17:50:00",
                            "timestamp": 1740160200,
                            "original": "2025-02-21T17:50:00"
                        },
                        "duration": 1465,
                        "stops": 1,
                        "flying_time": {
                            "amount": 1465,
                            "type": "m"
                        },
                        "transiting_time": [
                            {
                                "amount": 1035,
                                "type": "m"
                            }
                        ],
                        "distance": {
                            "amount": 0,
                            "type": ""
                        },
                        "price_key": "",
                        "has_baggage": false,
                        "connections": null,
                        "commission_key": "",
                        "commission_value_key": 0,
                        "segments_keys": null,
                        "private_fare": false,
                        "segments": [
                            {
                                "from": {
                                    "code": "BGW",
                                    "name": "Baghdad International Airport",
                                    "is_main": false,
                                    "city_code": "",
                                    "city_name": "Baghdad",
                                    "country_name": "Iraq",
                                    "longitude": "44.23285",
                                    "latitude": "33.2585",
                                    "utc": "+03:00",
                                    "timezone": "Asia/Baghdad",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-02-20 17:25:00",
                                    "timestamp": 1740072300,
                                    "original": "2025-02-20T17:25:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-02-20 20:35:00",
                                    "timestamp": 1740083700,
                                    "original": "2025-02-20T20:35:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9367",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "Babylon T",
                                "provider_code": "",
                                "uapi_segment_ref": "724265",
                                "plane": "AIRCRAFT",
                                "duration": 190,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 137,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            },
                            {
                                "from": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "IST",
                                    "name": "Istanbul Airport",
                                    "is_main": false,
                                    "city_code": "IST",
                                    "city_name": "Istanbul",
                                    "country_name": "Turkey",
                                    "longitude": "28.74113893066408",
                                    "latitude": "41.275873982430916",
                                    "utc": "+03:00",
                                    "timezone": "Europe/Istanbul",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-02-21 13:50:00",
                                    "timestamp": 1740145800,
                                    "original": "2025-02-21T13:50:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-02-21 17:50:00",
                                    "timestamp": 1740160200,
                                    "original": "2025-02-21T17:50:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9287",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "",
                                "provider_code": "",
                                "uapi_segment_ref": "759630",
                                "plane": "AIRCRAFT",
                                "duration": 240,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 137,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            }
                        ]
                    },
                    {
                        "from": {
                            "code": "IST",
                            "name": "Istanbul Airport",
                            "is_main": false,
                            "city_code": "IST",
                            "city_name": "Istanbul",
                            "country_name": "Turkey",
                            "longitude": "28.74113893066408",
                            "latitude": "41.275873982430916",
                            "utc": "+03:00",
                            "timezone": "Europe/Istanbul",
                            "type": "airport"
                        },
                        "to": {
                            "code": "BGW",
                            "name": "Baghdad International Airport",
                            "is_main": false,
                            "city_code": "",
                            "city_name": "Baghdad",
                            "country_name": "Iraq",
                            "longitude": "44.23285",
                            "latitude": "33.2585",
                            "utc": "+03:00",
                            "timezone": "Asia/Baghdad",
                            "type": "airport"
                        },
                        "plating_carrier": {
                            "code": "G9",
                            "name": "Air Arabia",
                            "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                        },
                        "departure": {
                            "formated_time": "2025-02-28 18:45:00",
                            "timestamp": 1740768300,
                            "original": "2025-02-28T18:45:00"
                        },
                        "arrival": {
                            "formated_time": "2025-03-01 11:30:00",
                            "timestamp": 1740828600,
                            "original": "2025-03-01T11:30:00"
                        },
                        "duration": 1005,
                        "stops": 1,
                        "flying_time": {
                            "amount": 1005,
                            "type": "m"
                        },
                        "transiting_time": [
                            {
                                "amount": 590,
                                "type": "m"
                            }
                        ],
                        "distance": {
                            "amount": 0,
                            "type": ""
                        },
                        "price_key": "",
                        "has_baggage": false,
                        "connections": null,
                        "commission_key": "",
                        "commission_value_key": 0,
                        "segments_keys": null,
                        "private_fare": false,
                        "segments": [
                            {
                                "from": {
                                    "code": "IST",
                                    "name": "Istanbul Airport",
                                    "is_main": false,
                                    "city_code": "IST",
                                    "city_name": "Istanbul",
                                    "country_name": "Turkey",
                                    "longitude": "28.74113893066408",
                                    "latitude": "41.275873982430916",
                                    "utc": "+03:00",
                                    "timezone": "Europe/Istanbul",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-02-28 18:45:00",
                                    "timestamp": 1740768300,
                                    "original": "2025-02-28T18:45:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-03-01 00:05:00",
                                    "timestamp": 1740787500,
                                    "original": "2025-03-01T00:05:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9288",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "TerminalX",
                                "provider_code": "",
                                "uapi_segment_ref": "759682",
                                "plane": "AIRCRAFT",
                                "duration": 320,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 160,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            },
                            {
                                "from": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "BGW",
                                    "name": "Baghdad International Airport",
                                    "is_main": false,
                                    "city_code": "",
                                    "city_name": "Baghdad",
                                    "country_name": "Iraq",
                                    "longitude": "44.23285",
                                    "latitude": "33.2585",
                                    "utc": "+03:00",
                                    "timezone": "Asia/Baghdad",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-03-01 09:55:00",
                                    "timestamp": 1740822900,
                                    "original": "2025-03-01T09:55:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-03-01 11:30:00",
                                    "timestamp": 1740828600,
                                    "original": "2025-03-01T11:30:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9368",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "",
                                "provider_code": "",
                                "uapi_segment_ref": "761516",
                                "plane": "AIRCRAFT",
                                "duration": 95,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 160,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            }
                        ]
                    }
                ],
                "passengerFares": {
                    "ADT": {
                        "total": 597.32,
                        "base": 597.32,
                        "taxes": 0,
                        "currency": "USD"
                    },
                    "CHD": {
                        "total": 0,
                        "base": 0,
                        "taxes": 0,
                        "currency": "USD"
                    },
                    "INF": {
                        "total": 0,
                        "base": 0,
                        "taxes": 0,
                        "currency": "USD"
                    }
                },
                "passengerCounts": {
                    "ADT": 1,
                    "CHD": 0,
                    "INF": 0
                },
                "unique_key": "",
                "group": 0,
                "brand_fares": null,
                "brands_id": null,
                "baggage_allowance": [
                    {
                        "passenger_type": "ADT",
                        "passenger_friendly": "Adult",
                        "baggage_allowance": [
                            {
                                "traveler_type": "ADT",
                                "from": {
                                    "code": "BGW",
                                    "name": "Baghdad International Airport",
                                    "is_main": false,
                                    "city_code": "",
                                    "city_name": "Baghdad",
                                    "country_name": "Iraq",
                                    "longitude": "44.23285",
                                    "latitude": "33.2585",
                                    "utc": "+03:00",
                                    "timezone": "Asia/Baghdad",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "url_info": "",
                                "text_info": null,
                                "bag_details": {
                                    "unit": "KG",
                                    "amount": 0,
                                    "details_baggage": null
                                }
                            }
                        ]
                    },
                    {
                        "passenger_type": "ADT",
                        "passenger_friendly": "Adult",
                        "baggage_allowance": [
                            {
                                "traveler_type": "ADT",
                                "from": {
                                    "code": "IST",
                                    "name": "Istanbul Airport",
                                    "is_main": false,
                                    "city_code": "IST",
                                    "city_name": "Istanbul",
                                    "country_name": "Turkey",
                                    "longitude": "28.74113893066408",
                                    "latitude": "41.275873982430916",
                                    "utc": "+03:00",
                                    "timezone": "Europe/Istanbul",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "url_info": "",
                                "text_info": null,
                                "bag_details": {
                                    "unit": "KG",
                                    "amount": 0,
                                    "details_baggage": null
                                }
                            }
                        ]
                    }
                ],
                "private_fare": false,
                "ref_key_id": "f972e489-ceb8-42d8-960d-cef7db40b579"
            },
            {
                "trace_id": "sLf7rX1tlHVbhHtQ",
                "search_id": "e2549015-022a-4c35-b5c1-477767d4b2e3",
                "result_id": "ceec4852-aeac-45f6-a0b1-f33dd57034f5",
                "universal_key": null,
                "direct_issue": true,
                "is_fast": false,
                "is_best": false,
                "has_baggage": false,
                "supply_provider": "G9",
                "group_id_key": "00000000-0000-0000-0000-000000000000",
                "result_type": 0,
                "search_type": "1",
                "keys": null,
                "price": {
                    "total": 597.32,
                    "base": 597.32,
                    "taxes": 0,
                    "currency": "USD"
                },
                "commission": {
                    "type": "",
                    "amount": 0,
                    "currency": "",
                    "ref": 0,
                    "ref_value": ""
                },
                "service_charge": null,
                "plating_carrier": {
                    "code": "G9",
                    "name": "Air Arabia",
                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                },
                "class": {
                    "service": "Economy",
                    "booking": "Y",
                    "seats_available": 137,
                    "fare_basis": ""
                },
                "price_solution_key": "",
                "directions": [
                    {
                        "from": {
                            "code": "BGW",
                            "name": "Baghdad International Airport",
                            "is_main": false,
                            "city_code": "",
                            "city_name": "Baghdad",
                            "country_name": "Iraq",
                            "longitude": "44.23285",
                            "latitude": "33.2585",
                            "utc": "+03:00",
                            "timezone": "Asia/Baghdad",
                            "type": "airport"
                        },
                        "to": {
                            "code": "IST",
                            "name": "Istanbul Airport",
                            "is_main": false,
                            "city_code": "IST",
                            "city_name": "Istanbul",
                            "country_name": "Turkey",
                            "longitude": "28.74113893066408",
                            "latitude": "41.275873982430916",
                            "utc": "+03:00",
                            "timezone": "Europe/Istanbul",
                            "type": "airport"
                        },
                        "plating_carrier": {
                            "code": "G9",
                            "name": "Air Arabia",
                            "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                        },
                        "departure": {
                            "formated_time": "2025-02-20 17:25:00",
                            "timestamp": 1740072300,
                            "original": "2025-02-20T17:25:00"
                        },
                        "arrival": {
                            "formated_time": "2025-02-21 17:50:00",
                            "timestamp": 1740160200,
                            "original": "2025-02-21T17:50:00"
                        },
                        "duration": 1465,
                        "stops": 1,
                        "flying_time": {
                            "amount": 1465,
                            "type": "m"
                        },
                        "transiting_time": [
                            {
                                "amount": 1035,
                                "type": "m"
                            }
                        ],
                        "distance": {
                            "amount": 0,
                            "type": ""
                        },
                        "price_key": "",
                        "has_baggage": false,
                        "connections": null,
                        "commission_key": "",
                        "commission_value_key": 0,
                        "segments_keys": null,
                        "private_fare": false,
                        "segments": [
                            {
                                "from": {
                                    "code": "BGW",
                                    "name": "Baghdad International Airport",
                                    "is_main": false,
                                    "city_code": "",
                                    "city_name": "Baghdad",
                                    "country_name": "Iraq",
                                    "longitude": "44.23285",
                                    "latitude": "33.2585",
                                    "utc": "+03:00",
                                    "timezone": "Asia/Baghdad",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-02-20 17:25:00",
                                    "timestamp": 1740072300,
                                    "original": "2025-02-20T17:25:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-02-20 20:35:00",
                                    "timestamp": 1740083700,
                                    "original": "2025-02-20T20:35:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9367",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "Babylon T",
                                "provider_code": "",
                                "uapi_segment_ref": "724265",
                                "plane": "AIRCRAFT",
                                "duration": 190,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 137,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            },
                            {
                                "from": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "IST",
                                    "name": "Istanbul Airport",
                                    "is_main": false,
                                    "city_code": "IST",
                                    "city_name": "Istanbul",
                                    "country_name": "Turkey",
                                    "longitude": "28.74113893066408",
                                    "latitude": "41.275873982430916",
                                    "utc": "+03:00",
                                    "timezone": "Europe/Istanbul",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-02-21 13:50:00",
                                    "timestamp": 1740145800,
                                    "original": "2025-02-21T13:50:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-02-21 17:50:00",
                                    "timestamp": 1740160200,
                                    "original": "2025-02-21T17:50:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9287",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "",
                                "provider_code": "",
                                "uapi_segment_ref": "759630",
                                "plane": "AIRCRAFT",
                                "duration": 240,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 137,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            }
                        ]
                    },
                    {
                        "from": {
                            "code": "IST",
                            "name": "Istanbul Airport",
                            "is_main": false,
                            "city_code": "IST",
                            "city_name": "Istanbul",
                            "country_name": "Turkey",
                            "longitude": "28.74113893066408",
                            "latitude": "41.275873982430916",
                            "utc": "+03:00",
                            "timezone": "Europe/Istanbul",
                            "type": "airport"
                        },
                        "to": {
                            "code": "BGW",
                            "name": "Baghdad International Airport",
                            "is_main": false,
                            "city_code": "",
                            "city_name": "Baghdad",
                            "country_name": "Iraq",
                            "longitude": "44.23285",
                            "latitude": "33.2585",
                            "utc": "+03:00",
                            "timezone": "Asia/Baghdad",
                            "type": "airport"
                        },
                        "plating_carrier": {
                            "code": "G9",
                            "name": "Air Arabia",
                            "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                        },
                        "departure": {
                            "formated_time": "2025-02-28 18:45:00",
                            "timestamp": 1740768300,
                            "original": "2025-02-28T18:45:00"
                        },
                        "arrival": {
                            "formated_time": "2025-03-01 16:45:00",
                            "timestamp": 1740847500,
                            "original": "2025-03-01T16:45:00"
                        },
                        "duration": 1320,
                        "stops": 1,
                        "flying_time": {
                            "amount": 1320,
                            "type": "m"
                        },
                        "transiting_time": [
                            {
                                "amount": 905,
                                "type": "m"
                            }
                        ],
                        "distance": {
                            "amount": 0,
                            "type": ""
                        },
                        "price_key": "",
                        "has_baggage": false,
                        "connections": null,
                        "commission_key": "",
                        "commission_value_key": 0,
                        "segments_keys": null,
                        "private_fare": false,
                        "segments": [
                            {
                                "from": {
                                    "code": "IST",
                                    "name": "Istanbul Airport",
                                    "is_main": false,
                                    "city_code": "IST",
                                    "city_name": "Istanbul",
                                    "country_name": "Turkey",
                                    "longitude": "28.74113893066408",
                                    "latitude": "41.275873982430916",
                                    "utc": "+03:00",
                                    "timezone": "Europe/Istanbul",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-02-28 18:45:00",
                                    "timestamp": 1740768300,
                                    "original": "2025-02-28T18:45:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-03-01 00:05:00",
                                    "timestamp": 1740787500,
                                    "original": "2025-03-01T00:05:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9288",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "TerminalX",
                                "provider_code": "",
                                "uapi_segment_ref": "759682",
                                "plane": "AIRCRAFT",
                                "duration": 320,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 160,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            },
                            {
                                "from": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "BGW",
                                    "name": "Baghdad International Airport",
                                    "is_main": false,
                                    "city_code": "",
                                    "city_name": "Baghdad",
                                    "country_name": "Iraq",
                                    "longitude": "44.23285",
                                    "latitude": "33.2585",
                                    "utc": "+03:00",
                                    "timezone": "Asia/Baghdad",
                                    "type": "airport"
                                },
                                "group": 0,
                                "connection": 0,
                                "departure": {
                                    "formated_time": "2025-03-01 15:10:00",
                                    "timestamp": 1740841800,
                                    "original": "2025-03-01T15:10:00"
                                },
                                "arrival": {
                                    "formated_time": "2025-03-01 16:45:00",
                                    "timestamp": 1740847500,
                                    "original": "2025-03-01T16:45:00"
                                },
                                "flight_time": "",
                                "flight_number": "G9366",
                                "distance": "0",
                                "eTicketability": "Yes",
                                "equipment": "A320-174",
                                "change_of_plane": false,
                                "participant_level": "",
                                "link_availability": "",
                                "polled_availability_option": "",
                                "optional_services_indicator": "",
                                "availability_source": "",
                                "availability_display_type": "",
                                "terminal": "",
                                "provider_code": "",
                                "uapi_segment_ref": "761418",
                                "plane": "AIRCRAFT",
                                "duration": 95,
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "code_share": null,
                                "class": {
                                    "service": "Economy",
                                    "booking": "Y",
                                    "seats_available": 160,
                                    "fare_basis": ""
                                },
                                "fare_info": null,
                                "baggage": {
                                    "units": "",
                                    "amount": 0
                                }
                            }
                        ]
                    }
                ],
                "passengerFares": {
                    "ADT": {
                        "total": 597.32,
                        "base": 597.32,
                        "taxes": 0,
                        "currency": "USD"
                    },
                    "CHD": {
                        "total": 0,
                        "base": 0,
                        "taxes": 0,
                        "currency": "USD"
                    },
                    "INF": {
                        "total": 0,
                        "base": 0,
                        "taxes": 0,
                        "currency": "USD"
                    }
                },
                "passengerCounts": {
                    "ADT": 1,
                    "CHD": 0,
                    "INF": 0
                },
                "unique_key": "",
                "group": 0,
                "brand_fares": null,
                "brands_id": null,
                "baggage_allowance": [
                    {
                        "passenger_type": "ADT",
                        "passenger_friendly": "Adult",
                        "baggage_allowance": [
                            {
                                "traveler_type": "ADT",
                                "from": {
                                    "code": "BGW",
                                    "name": "Baghdad International Airport",
                                    "is_main": false,
                                    "city_code": "",
                                    "city_name": "Baghdad",
                                    "country_name": "Iraq",
                                    "longitude": "44.23285",
                                    "latitude": "33.2585",
                                    "utc": "+03:00",
                                    "timezone": "Asia/Baghdad",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "url_info": "",
                                "text_info": null,
                                "bag_details": {
                                    "unit": "KG",
                                    "amount": 0,
                                    "details_baggage": null
                                }
                            }
                        ]
                    },
                    {
                        "passenger_type": "ADT",
                        "passenger_friendly": "Adult",
                        "baggage_allowance": [
                            {
                                "traveler_type": "ADT",
                                "from": {
                                    "code": "IST",
                                    "name": "Istanbul Airport",
                                    "is_main": false,
                                    "city_code": "IST",
                                    "city_name": "Istanbul",
                                    "country_name": "Turkey",
                                    "longitude": "28.74113893066408",
                                    "latitude": "41.275873982430916",
                                    "utc": "+03:00",
                                    "timezone": "Europe/Istanbul",
                                    "type": "airport"
                                },
                                "to": {
                                    "code": "SHJ",
                                    "name": "Sharjah International Airport",
                                    "is_main": false,
                                    "city_code": "DXB",
                                    "city_name": "Sharjah",
                                    "country_name": "United Arab Emirates",
                                    "longitude": "55.512171820068374",
                                    "latitude": "25.32858000000001",
                                    "utc": "+04:00",
                                    "timezone": "Asia/Dubai",
                                    "type": "airport"
                                },
                                "airline": {
                                    "code": "G9",
                                    "name": "Air Arabia",
                                    "logo": "https://www.gstatic.com/flights/airline_logos/70px/G9.png"
                                },
                                "url_info": "",
                                "text_info": null,
                                "bag_details": {
                                    "unit": "KG",
                                    "amount": 0,
                                    "details_baggage": null
                                }
                            }
                        ]
                    }
                ],
                "private_fare": false,
                "ref_key_id": "23ae8a50-02b2-42d9-aa01-b8810ab1e345"
            }
        ]
    )


    async function getAirPorts(query){
        const {data} = await axios.get(`/mapping/airports?query=${query}`)
        return data.data.items
    }

    async function getMainResult(payload){
        const {data} = await axios.post(`/flight/low-fare-search`,payload)
        result.value = data.data.search_flight
        filters.value = data.data.filters
        search_id.value = result?.value[0]?.search_id
        sessionStorage.setItem('MTN-Passenger', JSON.stringify({
            adt:payload.adt,
            chd:payload.chd,
            inf:payload.inf
        }))
    }

    async function filterResult(payload){
        await axios.post(`/flight/low-fare-search/${search_id.value}`,payload).then(({data})=>{
            result.value = data.data
        }).catch(()=>{
        })
    }

    return {
        getAirPorts,
        getMainResult,
        filterResult,
        trace_id,
        result_id,
        search_id,
        filters,
        result,
    }
})

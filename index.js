const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for å parse JSON-requests
app.use(express.json());
app.use(cors());

// Endpoint for stasjonsinformasjon
// Eksempel: GET /stations?name=Skøyen&city=Oslo
app.get('/stations', (req, res) => {
  const { name, city } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Parameter "name" er påkrevd.' });
  }
  // Dummy-data; erstatt med ekte logikk
  const stations = [
    { id: "NSR:StopPlace:123", name: `${name} stasjon${city ? ', ' + city : ''}` },
    { id: "NSR:StopPlace:456", name: `${name} Sentrum${city ? ', ' + city : ''}` }
  ];
  res.json({ stations });
});

// Endpoint for avganger
app.post('/departures', (req, res) => {
  const { stationId, numDepartures, transportMode, query } = req.body;
  if (!stationId || !numDepartures || !transportMode || !query) {
    return res.status(400).json({ error: 'Mangler ett eller flere påkrevde parametere.' });
  }
  // Dummy respons; erstatt med kall til EnTur API eller GraphQL
  const departures = [
    {
      aimedDepartureTime: "12:00",
      expectedDepartureTime: "12:05",
      destination: "Oslo",
      transportMode,
      lineNumber: "123"
    }
  ];
  res.json({ departures });
});

// Endpoint for reiseinformasjon (trip)
app.post('/trip', (req, res) => {
  const { originStation, destinationStation, dateTime, query } = req.body;
  if (!originStation || !destinationStation || !dateTime || !query) {
    return res.status(400).json({ error: 'Mangler ett eller flere påkrevde parametere.' });
  }
  // Dummy respons; erstatt med kall til EnTur API eller GraphQL
  const trips = [
    {
      startTime: "11:50",
      endTime: "12:30",
      duration: 2400
    }
  ];
  res.json({ trips });
});

// Starter serveren
app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});

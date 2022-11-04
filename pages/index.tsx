import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { useState } from 'react';


const API_KEY = "0e7d1981557e6d0ac991016ecde5d3f6";

export default function Home() {
  const [cityInput, setcityInput] = useState("");

  const [weatherData, setweatherData] = useState<any>({})

  async function getWeatherData() {

    try {
      const serverResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?" +
        "q=" +
        cityInput +
        "&appid=" +
        API_KEY +
        "&units=imperial"
      )
      const data = await serverResponse.json()
      console.log(data);
      if (data?.cod === "400") throw data;
      setweatherData(data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{
        position: "static",
        height: "100vh",
        backgroundImage: "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Paper withBorder p="lg" style={{ maxWidth: "500px" }}>
          <Group position='apart'  pb="lg">
            <Text size="xl" weight={500}>
              Get The Weather !
            </Text>
          </Group>
          <Group position='apart'  pb="lg">
            <Text size="lg" >
              Enter a city, and get the weather below!
            </Text>
          </Group>
          <Group position='apart' mb="xs"  pb="lg">
            <TextInput
              label="City Name"
              placeholder='ex: Belgrade'
              onChange={(e) => setcityInput(e.target.value)}
            />
          </Group>
          <Group position='apart'>
            <Button variant='gradient' size='md' onClick={() => getWeatherData()}>
              Get Weather
            </Button>
          </Group>
          {Object.keys(weatherData).length !== 0 ?
            <>
              <Group position='left'>
                <Text>
                  {weatherData.name} Weather
                </Text>
              </Group>
              <Group position='left'>
                <img
                  src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png"}
                  width="100px"
                  height="100px"
                />

                <Text size="lg" weight={500} >
                  Currently {weatherData.main.temp} &deg;F
                </Text>
              </Group>
            </>
            : null
          }
        </Paper>
      </div>
    </div>
  )
}

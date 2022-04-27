import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";

function Restaurant() {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`https://vast-escarpment-38548.herokuapp.com/api/restaurants/${id}`)
            .then((res) => res.json())
            .then((restaurantData) => {
                if (restaurantData.hasOwnProperty("_id")) {
                    setRestaurant(restaurantData);
                } else {
                    setRestaurant(null);
                }

                setLoading(false);
            })
            .catch((err) => console.log("Unable to read restaurant info" + err));
    }, [id]);

    if (loading) {
        return ( <Card style={{ marginTop: "10px" }}>
        <Card.Body>
            <Card.Title>Loading restaurant...</Card.Title>
        </Card.Body>
    </Card>)
    } else if (!restaurant) {
        return ( <Card style={{ marginTop: "10px" }}>
        <Card.Body>
            <Card.Title>Unable to find restaurant with id ${id}</Card.Title>
        </Card.Body>
    </Card>)
    } else {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{restaurant.name} </Card.Title>
                    <Card.Text>
                        <p>
                            {restaurant.address.street} {restaurant.address.building}
                            <br />
                           {restaurant.borough}
                            <br />
                             {restaurant.cuisine}
                        </p>
                    </Card.Text>
                </Card.Body>
                <MapContainer style={{ height: "400px" }} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                </MapContainer>

                
                <h4 style={{ padding: "20px" }}>Grades</h4>

                <CardDeck>
                    {restaurant.grades.map((grade) => (
                        <Card style={{ margin: "20px" }}>
                            <Card.Body style={{ padding: "10px" }}>
                                <Card.Text>Grade: <strong>{grade.grade}</strong></Card.Text>

                                <Card.Text>Date: <strong>{grade.date.substring(0,10)}</strong></Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </CardDeck>
            </Card>
        );
    }
}

export default Restaurant;

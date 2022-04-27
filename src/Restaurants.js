import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Card, Container, Pagination, Table } from "react-bootstrap";

function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);

    let query = queryString.parse(useLocation().search);
    let locat = query.borough;
    const navigate = useNavigate();

    useEffect(() => {
        let url = "";

        if (locat === undefined) {
            url = `https://vast-escarpment-38548.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
        } else {
            url = `https://vast-escarpment-38548.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${locat}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((restaurantData) => {
                setRestaurants(restaurantData);
            })
            .catch((err) => console.log("Unable to read restaurant info" + err));
    }, [page, locat]);

    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextPage() {
        setPage(page + 1);
    }

    if (restaurants) {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text>
                            <p>Full list of restaurants. Optionally sorted by borough.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Address</th>
      <th>Borough</th>
      <th>Cuisine</th>
    </tr>
  </thead>
  <tbody>
  
    {restaurants.map(
                    (restaurant) =>
                        restaurant.name !== undefined && (
                            <tr  onClick={() => {
                                navigate(`/restaurant/${restaurant._id}`);
                            }}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.address.street} {restaurant.address.building}</td>
                            <td>{restaurant.borough}</td>
                            <td>{restaurant.cuisine}</td>
                            </tr>
                        )
                )}

  </tbody>
</Table>

               

            <Pagination style={{ margin: "20px" }}>
                 <Pagination.Prev onClick={() => {previousPage();}}/>
                 <Pagination.Item>{page}</Pagination.Item>
                 <Pagination.Next onClick={() => {nextPage();}} />
             </Pagination>

            </Container>
        );
    } else {
        return ( <Card style={{ marginTop: "10px" }}>
        <Card.Body>
            <Card.Title>Loading restaurants...</Card.Title>
        </Card.Body>
    </Card>)
    }


}

export default Restaurants;

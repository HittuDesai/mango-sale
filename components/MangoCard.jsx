import React, { useContext, useState, useMemo } from "react";
import { CartContext } from "../context/cart";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { useEffect } from "react";

function MangoCard({ mango }) {
    const name = mango.name;
    const purpose = "Pickle";
    const photo = "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80";
    const stock = mango.stock;
    const price = mango.price;
    const discount = mango.discount;

    const {cart, setCart} = useContext(CartContext);
    const initialQuantity = (cart[name]) ? cart[name]["quantity"] : 0;
    const defaultValueOfQuantity = initialQuantity;
    const [quantity, setQuantity] = useState(defaultValueOfQuantity);
    const defaultValueOfAddedToCart = initialQuantity !== 0;
    const [addedToCart, setAddedToCart] = useState(defaultValueOfAddedToCart);
    
    const [localCart, setLocalCart] = useState(null);
    useEffect(() => {
        if(!localCart)
            setLocalCart(cart);
    }, [cart]);
    useEffect(() => {
        if(localCart)
            setCart(localCart);
    }, [localCart]);

    const RemindMeButton = () => (
        <Button><AddAlertIcon />Remind Me</Button>
    );

    const AddToCartButton = () => (
        <IconButton onClick={() => {
            setAddedToCart(true);
            setQuantity(1);
            let newMango = { ...mango };
            newMango["quantity"] = 1;
            const newCart = { ...cart };
            newCart[name] = newMango;
            setLocalCart(newCart);
        }}><AddShoppingCartIcon /></IconButton>
    )

    return(
        <Card key={name} id={name}>
            <CardHeader title={name} />
            <CardMedia image={photo} sx={{ height: "200px" }} />
            <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">{`₹${price}`}</Typography>
                </div>
                <CardActions>{
                    stock === 0 ?
                    <RemindMeButton /> :
                    addedToCart ? 
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <IconButton onClick={() => {
                            if(quantity == 1) {
                                setAddedToCart(false);
                                setQuantity(0);
                                let newMango = { ...mango };
                                newMango["quantity"] = 0;
                                const newCart = { ...cart };
                                newCart[name] = newMango;
                                setLocalCart(newCart);
                            } else {
                                setQuantity(quantity - 1);
                                let newMango = { ...mango };
                                newMango["quantity"] = quantity - 1;
                                const newCart = { ...cart };
                                newCart[name] = newMango;
                                setLocalCart(newCart);
                            }
                        }}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography gutterBottom={false} align="center" variant="h5">{quantity}</Typography>
                        <IconButton onClick={() => {
                            if(quantity == mango.stock) {
                                console.log("THAT'S IT");
                            } else {
                                setQuantity(quantity + 1);
                                let newMango = { ...mango };
                                newMango["quantity"] = quantity + 1;
                                const newCart = { ...cart };
                                newCart[name] = newMango;
                                setLocalCart(newCart);
                            }
                        }}>
                            <AddIcon />
                        </IconButton>
                    </div> : <AddToCartButton />
                }</CardActions>
            </CardContent>
        </Card>
    );
}

export default MangoCard;
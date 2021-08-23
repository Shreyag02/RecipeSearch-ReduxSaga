import './App.css';
import React , {useState, useEffect} from 'react'
import {TextField, Button,Grid,makeStyles,Card,CardMedia,CardContent,CardActions,Dialog,DialogActions,DialogContent,DialogTitle,useMediaQuery,IconButton,Typography, Box, useTheme} from '@material-ui/core';
import {Favorite, Share, DirectionsRun, Visibility, VisibilityOff}from '@material-ui/icons'
import image from './image.svg'
import * as actions from './redux/action.types';
import {useDispatch, useSelector} from 'react-redux'
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
}));

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:25,
  },

  control: {
    padding: theme.spacing(2),
  },
}));

const cardStyles = makeStyles((theme) => ({
  root: {
    width:345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand:{
    marginLeft:'auto'
  }
}));

function App() {
  const classes = useStyles();
  const gridclasses = gridStyles();
  const cardclasses = cardStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [cardValue, setcardValue] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (index) => {
    setcardValue(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hitRecipes = useSelector(state => state.data.recipes.hits);
  console.log("hitRecipes", hitRecipes);
  
  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };

  let dispatch = useDispatch();

  useEffect(() => {dispatch({
      type: actions.FETCH_RECIPE_START,
      payload: query,
    });
  }, [query])


  return (
    <div className="App">
      <div className="bg"></div>
      <div >
        <Grid container spacing={10} alignItems="center" style={{padding:"10px"}}>
        <Grid item xs={12} md={6}>
            <img src={image} alt="" style={{height:"45vh", maxWidth:"95vw"}}/>
          </Grid>

          <Grid item xs={12} md={6} >
            <h2>
          FIND YOUR TOP RECIPES
            </h2>
            <form  noValidate autoComplete="off" className={classes.root}>
              <TextField 
              id="outlined-basic" 
              label="Tasty Recipes" variant="outlined" 
              type="text" 
              value={search} 
              onChange={(e)=> setSearch(e.target.value)}/>
              <br/>
              <Button variant="contained" color="primary" onClick={updateSearch}>
                Search
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>

      <Grid container className={gridclasses.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {hitRecipes && hitRecipes.map((item,index )=> (
            <Grid key={index} item>
              <Card className={cardclasses.root}>
                
                <CardMedia
                  className={cardclasses.media}
                  image={item.recipe.image}
                  title={item.recipe.label}
                />
                <CardContent>
                
                <Box display='flex' justifyContent="space-between" alignItems="baseline">
                  <Typography  display='block' align='left'>
                  {item.recipe.label}
                  </Typography>
                  <Typography variant="caption" >
                    <DirectionsRun/>
                    {Math.round(item.recipe.calories)} kcal
                  </Typography>
                </Box>
                  <Typography variant="caption" display="block" align="left">
                  Cuisine Type: {item.recipe.cuisineType[0]}
                  </Typography>
                  <Typography variant="caption" display="block" align="left">
                  Dish Type: {item.recipe.dishType[0]}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite/>
                  </IconButton>
                  <IconButton aria-label="share">
                    <Share/>
                  </IconButton>
                  <IconButton
                  className={clsx(cardclasses.expand)}
                    onClick={() => handleClickOpen(index)}
                    aria-label="show more"
                  >
                    {open?<VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </CardActions>



                <Dialog
                  fullScreen={fullScreen}
                  open={index=== cardValue && open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">{item.recipe.label}</DialogTitle>
                  <DialogContent>
                    <Typography paragraph variant='h6'>Ingredients:</Typography>
                    {item.recipe.ingredients.map((ingredient,index) => (
                      <Typography paragraph key={index}>
                        {ingredient.text}
                      </Typography>
                    ))}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

                
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      </Grid>

      
    </div>
  );
}

export default App;



 
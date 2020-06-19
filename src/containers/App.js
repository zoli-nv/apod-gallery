import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import SearchBar from '../components/SearchBar';
import ImagenOfDay from '../components/ImagenOfDay';
import CardList from '../components/CardList';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollArrow from '../components/ScrollArrow';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'Agust', 'September', 'Octuber', 'November', 'December'];

const URL_APOD = 'https://api.nasa.gov/planetary/apod?api_key='
                    + process.env.REACT_APP_APOD_API_KEY;

const MIN_YEAR = 2015;

const THIS_DATE = new Date();

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
        level: 0,
        year: null,
        month: null,
        day: null,
        currentDate: new Date(),
        image: {},
        images: new Map()
    }

    this.searchChange = this.searchChange.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.comeBack = this.comeBack.bind(this);

  }

  async componentDidMount(){

      let years = new Map();
      let currentImage;

      for(let i = MIN_YEAR; i <= this.state.currentDate.getFullYear(); i++){
        
        let days = new Map();
        days.set(1, await this.getImage(new Date(i, 0, 1)));

        let months = new Map();
        months.set(0, days); 

        years.set(i, months);
      }

      currentImage = await this.setCurrentImage(years, this.state.currentDate);

      this.setState({
        images: years,
        image: currentImage
      });

  }

  async searchChange(event){
    const date = event;
    let years = new Map(this.state.images);
    let currentImage = await this.setCurrentImage(years, date);
    
    this.setState({
      images: years,
      currentDate: date,
      image: currentImage
    });

  }

  async selectCard(event){
    const value = event.currentTarget.id;
    let years = new Map(this.state.images);
    let months;
    let days;

    switch(this.state.level){
      case 2:
        const newDay = parseInt(value);
        const newDate = new Date(this.state.year, this.state.month, newDay);
        let currentImage = years.get(this.state.year)
                                .get(this.state.month)
                                .get(newDay);
        this.setState({
          day: newDay,
          currentDate: newDate,
          image: currentImage
        });
        break;
      case 1:
        const newMonth = MONTHS.indexOf(value);
        months = new Map(this.state.images.get(this.state.year));
        days = new Map(this.state.images.get(this.state.year).get(newMonth));
        let daysInMonth 

        if(this.state.year === THIS_DATE.getFullYear()
            && newMonth === THIS_DATE.getMonth()){
          daysInMonth = THIS_DATE.getDate();
        }else{
          daysInMonth = new Date(this.state.year, newMonth+1, 0).getDate();
        }

        for(let i=1; i<=daysInMonth; i++){
          if(!days.has(i)){
            days.set(i, await this.getImage(new Date(this.state.year, newMonth, i)));
          }
        }

        const daysOrder = [...days.entries()].sort((a,b)=>a[0]-b[0]);

        months.set(newMonth, new Map(daysOrder));
        years.set(this.state.year, months);

        this.setState({
          images: years,
          level: 2,
          month: newMonth,
          day: null,
        });

        break;
      case 0:
      default:
        const newYear = parseInt(value);
        months = new Map(this.state.images.get(newYear));
        let monthsInYear;

        if(newYear === THIS_DATE.getFullYear()){
          monthsInYear = THIS_DATE.getMonth() + 1;
        }else{
          monthsInYear = MONTHS.length;
        }
        
        for(let i=0; i<monthsInYear; i++){
          let days;

          if(!months.has(i)){
            days = new Map();
          }else {
            days = months.get(i);
          }

          if(!days.has(1)){
            days.set(1, await this.getImage(new Date(newYear, i, 1)));
            months.set(i, days);
          }
        }

        const monthsOrder = [...months.entries()].sort((a,b)=>a[0]-b[0]);

        years.set(newYear, new Map(monthsOrder));

        this.setState({
          images: years,
          level: 1,
          year: newYear,
          month: null,
          day: null,
        });

        break;
    }
  }

  comeBack(){
    switch(this.state.level){
      case 2:
        this.setState({
          level: 1,
          month: null,
          day: null
        });
        break;
      case 1:
        this.setState({
          level: 0,
          year: null,
          month: null,
          day: null
        });
        break;
      case 0:
      default:
        this.setState({
          level: 0,
          year: null,
          month: null,
          day: null
        });
        break;
    }
  }

  filterImages(){
    switch(this.state.level){
      case 2:
        let days = new Map();
        for(const [key, value] of this.state.images.get(this.state.year)
                                        .get(this.state.month).entries()){
          days.set(key, value);
        }
        return days;
      case 1:
        let months = new Map();
        for(const [key, value] of this.state.images.get(this.state.year).entries()){
          months.set(MONTHS[key], value.get(1));
        }
        return months;
      case 0:
      default: 
        let years = new Map();
        for(const [key, value] of this.state.images.entries()){
          years.set(key, value.get(0).get(1));
        }
        return years;
    }

  }

  async setCurrentImage(years, date){
    
    let currentImage;

    if(!years.get(date.getFullYear())
            .has(date.getMonth())){
        years.get(date.getFullYear())
            .set(date.getMonth(), new Map());
    }

    if(!years.get(date.getFullYear())
            .get(date.getMonth())
            .has(date.getDate())){
      currentImage = await this.getImage(date);
      years.get(date.getFullYear())
            .get(date.getMonth())
            .set(date.getDate(), currentImage);
    }else{
      return years.get(date.getFullYear())
            .get(date.getMonth())
            .get(date.getDate());
    }

    return currentImage;

  }

  async getImage(date){
    try{
      const response = await trackPromise(
                            fetch(URL_APOD
                                +'&date='
                                +date.toISOString().slice(0,10)));
      const data = await response.json();
      return data;
    }catch{
      return {};
    }
  }

  render(){
    const image = this.state.image;
    const date = this.state.currentDate;
    const images = this.filterImages();

    return(
        <div className="dark-shades">
            <Header />
            <h1 className="f1 tc bodoni light-shades">APOD Gallery</h1>
            <SearchBar searchChange={this.searchChange}
                        date={date}/>
            <ImagenOfDay image={image} />
            <CardList images={images} 
                      selectCard={this.selectCard}/>
            <ScrollArrow />
            {this.state.level !== 0?
              <Button text={"Regresar"} 
                      onClick={this.comeBack} />
            : ''
            }
            <Footer />
        </div>
      );
  }
}

export default App;

import React from "react";
import "./AnimalContent.css";
import items from "../../items.json";

class AnimalCard extends React.Component {
  state = {
    items,
    clickStreak: 1,
    topScore: 1,
    clickStreakArray: [],
    topScoreArray: []
  };

  handleClick(item){
    //when item clicked, shuffle all items 
    let items = this.shuffleArray(this.state.items);
    this.setState({ items });

    //logic for counting points/streaks will go here 
    //WHENEVER an item clicked do the following: 
    //check clickStreakArray to determine if its already been clicked 

        if (this.state.clickStreakArray.includes(item.name)){
          console.log("includes:" + item.name);
                if ((this.state.clickStreak) > (Math.max(...this.state.clickStreakArray))){
                    console.log(this.state.clickStreak + "is new top score");
                    this.topScoreArray.push(this.state.clickStreak);
                    this.setState({topScore: this.state.clickStreak, topScoreArray: this.state.topScoreArray});
                }
                else {
                  console.log("old topscore remains: " + (Math.max(...this.state.topScoreArray)));
                }
          //compare clickStreak to topScore array 
              //if clickStreak > any # in topScore array-->push to topScore array and update topScore 
          this.setState({clickStreak: 1, clickStreakArray:[]});
          console.log(this.state);

        }
        else {
          console.log("no");
          this.state.clickStreakArray.push(item.name);
          this.setState({clickStreak: this.state.clickStreak+1, clickStreakArray: this.state.clickStreakArray});
          console.log("array:" + this.state.clickStreakArray);
          console.log("clickStreak:" + this.state.clickStreak);
          //add +1 to clickStreak
            //add item to clickStreakArray 
        }           
    
  }

  //using shuffle with es6: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  shuffleArray(items) {
    const newItems = items.slice();
    for (let i = newItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newItems[i], newItems[j]] = [newItems[j], newItems[i]]; // eslint-disable-line no-param-reassign
    } return newItems;  
}

  render() {
      return (
        <div className="container">
          <div className="row justify-content-md-center">
            {this.state.items.map(item => (
              //when handleClick is called below with this.handlecClick, the 'this' is null, therefore, use the arrow function to tie the 'this' to the function
              //exaplined at: https://reactarmory.com/answers/when-to-use-arrow-functions
              <div className="col-sm-3 outerDiv" onClick={() => this.handleClick(item)} key={item.id}>
                <img className="animalImages" src={item.image} alt={item.name}/>
              </div>))}
        </div>
     </div>
      )
    }
};

export default AnimalCard;
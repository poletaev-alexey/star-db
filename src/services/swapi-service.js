
export  default class SwapiService {
    _apiBase = 'https://swapi.co/api';
    async getResourse (url){
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`cound not fetch ${url}` +
                `,receiver ${res.status}`)
        }

        return await res.json();

    }
     async getPerson(id){
        const person = await this.getResourse(`/people/${id}/`);
        return this._transformPerson(person);
    }
    async getAllPeople(){
        const res = await this.getResourse(`/people/`)
        return res.results.map(this._transformPerson);
    }
    async getAllPlanets(){
        const res = await this.getResourse(`/planets/`)
        return res.results.map(this._transformPlanet);
    }
    async getAllStarships(){
        const res = await this.getResourse(`/starships/`)
        return res.results.map(this._transformStarship);
    }
     async getStarship(id){
        const starship =  this.getResourse(`/starships/${id}/`);
        return this._transformStarship(starship);
    }
    async getPlanet(id){
        const planet = await  this.getResourse(`/planets/${id}/`);
        return this._transformPlanet(planet);
    }
    _extractId(item){
        const idRegExp = /\/([0-9]*)\/$/;
        return  item.url.match(idRegExp)[1];
    }

    _transformPerson(person){
        return{
            id:this._extractId(person),
            name:person.name,
            gender:person.gender,
            birthYear:person.birthYear,
            eyeColor:person.eyeColor
        }
    }
    _transformStarship(starship){
        return{
            id:this._extractId(starship),
            name:starship.name,
            model:starship.model,
            manufacturer:starship.manufacturer,
            costInCredits:starship.costInCredits,
            length:starship.length,
            crew:starship.crew,
            passengers:starship.passengers,
            cargoCapacity:starship.CargoCapacity
        }
    }
    _transformPlanet(planet){

        return{
            id:this._extractId(planet),
            name:planet.name,
            population:planet.population,
            rotationPeriod:planet.rotation_period,
            diameter:planet.diameter
        }

    }
}

const swapi = new SwapiService();
swapi.getPerson(3).then((p)=>{
    console.log(p.name);
});

import { Component, OnInit } from '@angular/core';

import data from 'src/assets/json/datasource.json';
import empleados from 'src/assets/json/info-population.json';
import { Person } from '../models/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Array<Person>;
  data: any;
  constructor() {
    this.empleados = [];
    this.data = data.data;
  }

  ngOnInit(): void {
    this.mapEmpleados();
    this.findSex();
    this.findPhone();
    this.findCountry();
    console.log(this.empleados);
  }

  mapEmpleados() {

    for (let empleado of empleados.population['person']) {
      this.empleados.push(
        new Person(empleado['id'], empleado['name'], empleado['surname'], empleado['surname2'], empleado['sex'], empleado['country-id'], empleado['phone'], empleado['datebirthday'], empleado['lastModification'], '')
      )

    }
  }
  findSex() {
    let sexos = this.data.sex
    this.empleados.map(empleado => {
      for (let sex of sexos) {
        if (empleado.sex === sex.key) {
          empleado.sex = sex.description
        }
      }
    })
  };

  findPhone() {
    let paises = this.data.country
    this.empleados.map(empleado => {
      for (let pais of paises) {
        if (empleado.countryid === pais.id) {
          empleado.phone = "+(" + pais.prefix + ")" + empleado.phone;
        }
      }
    })
  };

  findCountry() {
    let paises = this.data.country
    this.empleados.map(empleado => {
      for (let pais of paises) {
        if (empleado.countryid === pais.id) {
          empleado.country = pais.description
        }
      }
    })
  };

}

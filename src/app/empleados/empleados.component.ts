import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import data from 'src/assets/json/datasource.json';
import empleados from 'src/assets/json/info-population.json';
import { Person } from '../models/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleadosActivos: Array<Person> = [];
  data: any;
  page: number = 1;
  pageSize: number = 10;
  searchValue: FormControl = new FormControl;
  constructor() {
    this.data = data.data;
  }

  ngOnInit(): void {
    this.mapEmpleados();
    this.findSex();
    this.findPhone();
    this.findCountry();
    console.log(this.empleadosActivos);
  }

  mapEmpleados() {
    this.empleadosActivos = [];
    for (let empleado of empleados.population['person']) {
      this.empleadosActivos.push(
        new Person(empleado['id'], empleado['name'], empleado['surname'], empleado['surname2'], empleado['sex'], empleado['country-id'], empleado['phone'], empleado['datebirthday'], empleado['lastModification'], '')
      )

    }
  }
  findSex() {
    let sexos = this.data.sex
    this.empleadosActivos.map(empleado => {
      for (let sex of sexos) {
        if (empleado.sex === sex.key) {
          empleado.sex = sex.description
        }
      }
    })
  };

  findPhone() {
    let paises = this.data.country
    this.empleadosActivos.map(empleado => {
      for (let pais of paises) {
        if (empleado.countryid === pais.id) {
          empleado.phone = "+(" + pais.prefix + ")" + empleado.phone;
        }
      }
    })
  };

  findCountry() {
    let paises = this.data.country
    this.empleadosActivos.map(empleado => {
      for (let pais of paises) {
        if (empleado.countryid === pais.id) {
          empleado.country = pais.description
        }
      }
    })
  };

  sortTable(event: any) {
    let res = event.target.value;
    switch (res) {
      case 'name':
        this.empleadosActivos.sort(function (a, b) {
          return ('' + a.name).localeCompare(b.name);
        });
        break;
      case 'datebirthday':
        this.empleadosActivos.sort(function (a, b) {
          return +new Date(b.datebirthday) - +new Date(a.datebirthday);
        });
        break;
      case 'sex':
        this.empleadosActivos.sort(function (a, b) {
          return ('' + a.sex).localeCompare(b.sex);
        });
        break;
      case 'phone':
        this.empleadosActivos.sort(function (a, b) {
          return ('' + a.phone).localeCompare(b.phone);
        });
        break;
      case 'lastModification':
        this.empleadosActivos.sort(function (a, b) {
          return +new Date(b.lastModification) - +new Date(a.lastModification);
        });
        break;
    }

  };
  updateResults() {

    if (this.searchValue.value.toLowerCase() == '') {
      this.mapEmpleados();
    } else {

      for (let empleado of this.empleadosActivos) {
        empleado.country
        for (let data in empleado) {
          console.log(data);
          if (data.toLowerCase().includes(this.searchValue.value.toLowerCase())) {
            this.empleadosActivos = [];
            this.empleadosActivos.push(empleado);

          }
        }

      }
    }
    console.log(this.searchValue.value.toLowerCase())
  };


}

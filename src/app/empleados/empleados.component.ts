import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import data from 'src/assets/json/datasource.json';
import empleados from 'src/assets/json/info-population.json';
import { Persona } from '../models/person';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleadosActivos: Array<Persona> = [];
  data: any;
  page: number;
  pageSize: number;
  searchValue: FormControl = new FormControl;
  constructor() {
    this.page = 1;
    this.pageSize = 10;
    this.empleadosActivos = empleados.population['person'];
    this.data = data.data;
  }

  //Comencé creando una clase debido a que últimamente no salgo de PHP y Laravel, y luego creé la interface. Os dejo el mapeo de datos que usé para la clase. Ya no sirve de nada, pero lo dejo de muestra.

  ngOnInit(): void {
    /* this.mapEmpleados(); */
    this.findSex();
    this.findPhone();
    this.findCountry();
  }

  /* mapEmpleados() {
    this.empleadosActivos = [];
    for (let empleado of empleados.population['person']) {
      this.empleadosActivos.push(
        new Person(empleado['id'], empleado['name'], empleado['surname'], empleado['surname2'], empleado['sex'], empleado['country-id'], empleado['phone'], empleado['datebirthday'], empleado['lastModification'], '')
      )

    }
  } */

  //Para buscar el sexo en el 2º JSON
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

  //Para buscar el prefijo en el 2º JSON
  findPhone() {
    let paises = this.data.country
    this.empleadosActivos.map(empleado => {
      for (let pais of paises) {
        if (empleado['country-id'] === pais.id) {
          empleado.phone = "+(" + pais.prefix + ")" + empleado.phone;
        }
      }
    })
  };

  //Para buscar el país en el 2º JSON
  findCountry() {
    let paises = this.data.country
    this.empleadosActivos.map(empleado => {
      for (let pais of paises) {
        if (empleado['country-id'] === pais.id) {
          empleado.country = pais.description
        }
      }
    })
  };

  //Switch que ordena la tabla
  sortTable(event: any) {
    let res = event.target.value;
    switch (res) {
      case 'id':
        this.empleadosActivos.sort(function (a, b) {
          return a.id - b.id;
        });
        break;
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
      case 'country':
        this.empleadosActivos.sort(function (a, b) {
          return ('' + a.country).localeCompare(b.country);
        });
        break;
      case 'lastModification':
        this.empleadosActivos.sort(function (a, b) {
          return +new Date(b.lastModification) - +new Date(a.lastModification);
        });
        break;
    }

  };

  //Función para la búsqueda de parámetros en la tabla
  updateResults() {
    let search = this.searchValue.value.toLowerCase();
    if (search == '') {
      this.empleadosActivos = empleados.population['person'];
    } else {
      this.empleadosActivos = empleados.population['person'].filter((empleado: Persona) => {
        return empleado.name.toLowerCase().includes(search) || empleado.surname.toLowerCase().includes(search) || empleado.surname2.toLowerCase().includes(search) || empleado.sex.toLowerCase().includes(search) || empleado.phone.toLowerCase().includes(search) || empleado.datebirthday.toLowerCase().includes(search) || empleado.lastModification.toLowerCase().includes(search) || empleado.country.toLowerCase().includes(search);
      })
    }
  };


}

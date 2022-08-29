//BOTONES Y SELECTS

const btnBalance = document.getElementById("btn-balance");
const btnCategorias = document.getElementById("btn-categorias");
const btnReportes = document.getElementById("btn-reportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const cancelarBtn = document.getElementById("cancelar-btn");
const agregarBtn = document.getElementById("agregar-btn");
const ocultarFiltros = document.getElementById("ocultar-filtros");
const selectEditarTipo = document.getElementById("select-edit-tipo");

// PAGINAS Y FORMULARIOS
const balance = document.getElementById("balance");
const categorias = document.getElementById("categorias");
const reportes = document.getElementById("reportes");
const containerNuevaOperacion = document.getElementById(
  "container-nueva-operacion"
);
const cardBalance = document.getElementById("card-balance");
const containerFiltros = document.getElementById("container-filtros");
const sinOperaciones = document.getElementById("sin-operaciones");
const conOperaciones = document.getElementById("con-operaciones");
const operaciones = document.getElementById("operaciones");
const cardEditarOperacion = document.getElementById(
  "container-editar-operacion"
);
const cardEditarcategoria = document.getElementById("card-editar-categorias");
const cardCategoria = document.getElementById("card-categorias");
const reporteSinOperacion = document.getElementById("reporte-sin-operacion");
const reporteConOperacion = document.getElementById("reporte-con-operaciones");
const PorCategoriaLista = document.getElementById("total-por-categoria");

// INPUTS

const descripcionInput = document.getElementById("descripcion-input");
const montoInput = document.getElementById("monto-input");
const tipoSelect = document.getElementById("tipo-select");
const categoriaSelect = document.getElementById("categoria-select");
const fechaInput = document.getElementById("fecha-input");
const inputEditarDescripcion = document.getElementById(
  "input-edit-descripcion"
);
const inputEditarMonto = document.getElementById("input-edit-monto");
const selectEditarCategoria = document.getElementById("select-edit-categoria");
const inputEditarFecha = document.getElementById("input-edit-fecha");

// ************ SECCION EVENTOS NAV ************

// Boton a balance que oculta categorias, reportes y formulario de nueva operacion

btnBalance.addEventListener("click", () => {
  balance.classList.remove("d-none");
  categorias.classList.add("d-none");
  reportes.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
  cardEditarOperacion.classList.add("d-none");
});

// Boton a categorias que oculta balance, reportes y formulario de nueva operacion

btnCategorias.addEventListener("click", () => {
  categorias.classList.remove("d-none");
  balance.classList.add("d-none");
  reportes.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
  cardEditarOperacion.classList.add("d-none");
});

// Boton a reportes que oculta balance, categorias y formulario de nueva operacion

btnReportes.addEventListener("click", () => {
  reportes.classList.remove("d-none");
  categorias.classList.add("d-none");
  balance.classList.add("d-none");
  containerNuevaOperacion.classList.add("d-none");
  cardEditarOperacion.classList.add("d-none");
  if (!arrOperaciones.length) {
    reporteSinOperacion.classList.remove("d-none");
    reporteConOperacion.classList.add("d-none");
  } else {
    reporteConOperacion.classList.remove("d-none");
    reporteSinOperacion.classList.add("d-none");
  }
  reportesResumen(JSON.parse(localStorage.getItem("arrOperaciones")));
  mesMayorGananciaYGasto(JSON.parse(localStorage.getItem("arrOperaciones")));
  
  
});

// Boton a formulario de nueva operacion que oculta balance, categorias y reportes

btnNuevaOperacion.addEventListener("click", () => {
  containerNuevaOperacion.classList.remove("d-none");
  balance.classList.add("d-none");
});

// Boton que cancela formulario de nueva operacion y deja en vista a balance

cancelarBtn.addEventListener("click", () => {
  balance.classList.remove("d-none");
  containerNuevaOperacion.classList.add("d-none");
});

ocultarFiltros.addEventListener("click", () => {
  containerFiltros.classList.toggle("d-none");
});

//                                                             ************************************
//                                                                     SECCION OPERACIONES
//                                                             ************************************

let arrOperaciones = JSON.parse(localStorage.getItem("arrOperaciones")) || [];
// let arrOperaciones = [];
const obtenerOperaciones = () => {
  return JSON.parse(localStorage.getItem("arrOperaciones")) || [];
};

// Función que oculta la imagen de sin operaciones si hay operaciones nuevas
const listaOperaciones = (arr) => {
  if (!arr.length) {
    sinOperaciones.classList.remove("d-none");
    conOperaciones.classList.add("d-none");
  } else {
    sinOperaciones.classList.add("d-none");
    conOperaciones.classList.remove("d-none");
  }
};

// Botón que agrega una operacion nueva que se crea con la funcion operacionAgregada

agregarBtn.addEventListener("click", () => {
  const operacion = {
    id: uuidv4(),
    descripcion: descripcionInput.value,
    monto: montoInput.value,
    tipo: tipoSelect.value,
    categoria: categoriaSelect.value,
    fecha: fechaInput.value,
  };

  arrOperaciones.push(operacion);

  balance.classList.remove("d-none");
  containerNuevaOperacion.classList.add("d-none");

  descripcionInput.value = "";
  montoInput.value = 0;
  tipoSelect.value = "gasto";
  categoriaSelect.value = "comida";
  fechaInput.valueAsDate = new Date();

  listaOperaciones(arrOperaciones);

  localStorage.setItem("arrOperaciones", JSON.stringify(arrOperaciones));

  operacionAgregada(arrOperaciones);
});

// Función que crea el div con las operaciones

operacionAgregada = (arr) => {
  document.getElementById("operaciones").innerHTML = "";
  let str = "";
  arr.forEach((operacion) => {
    const { id, descripcion, categoria, fecha, tipo, monto } = operacion;

    str += `<div class="mi-flex d-flex flex-row mt-4 lista-op" aria-label="operacion">
              <div class="col-3 op-descripcion">
                <span>${descripcion}</span>
              </div>
              <div class="col-2 op-categoria">
                <span class="color text-success">${categoria}</span>
              </div>
              <div class="col-2 text-end op-fecha">
                <span>${fecha}</span>
              </div>
              <div class="col-2 fw-bold op-monto">
                <span class="${
                  tipo === "ganancia" ? "green" : "red"
                }">${monto}</span>
              </div>
                <span class="col-3 text-end op-acciones">
                  <a href="#" class="btn-editar me-2" data-id=${id} aria-label="boton para editar operacion">Editar</a>
                  <a href="#" class="btn-eliminar" data-id=${id} aria-label="boton para eliminar operacion">Eliminar</a>
                </span>
            </div>`;
  });
  operaciones.innerHTML = str;
  totalBalance(arrOperaciones);

  //                             BOTON EDITAR OPERACION

  const agregarEditadoBtn = document.getElementById("agregar-editado-btn");
  const editarBtns = document.querySelectorAll(".btn-editar");

  editarBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arrEditarOperacion = arrOperaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );

      arrEditarOperacion.forEach((element) => {
        id = element.id;
        inputEditarDescripcion.value = element.descripcion;
        inputEditarMonto.value = element.monto;
        selectEditarTipo.value = element.tipo;
        selectEditarCategoria.value = element.categoria;
        inputEditarFecha.value = element.fecha;
      });

      balance.classList.add("d-none");
      cardEditarOperacion.classList.remove("d-none");
    });
  });

  agregarEditadoBtn.addEventListener("click", () => {
    arrOperaciones.forEach((operacion) => {
      const id = operacion.id;
    });

    const operacionAEditar = {
      id: id,
      descripcion: inputEditarDescripcion.value,
      monto: inputEditarMonto.value,
      tipo: selectEditarTipo.value,
      categoria: selectEditarCategoria.value,
      fecha: inputEditarFecha.value,
    };

    const agregarOperacionaEditada = arrOperaciones.map((arrOperaciones) =>
      arrOperaciones.id === id ? operacionAEditar : arrOperaciones
    );

    localStorage.setItem(
      "arrOperaciones",
      JSON.stringify(agregarOperacionaEditada)
    );
    arrOperaciones = JSON.parse(localStorage.getItem("arrOperaciones"));

    balance.classList.remove("d-none");
    cardEditarOperacion.classList.add("d-none");

    operacionAgregada(arrOperaciones);
    listaOperaciones(arrOperaciones);
    totalBalance(arrOperaciones);
  });

  const cancelarEdicionBtn = document.getElementById("cancelar-editar-btn");

  cancelarEdicionBtn.addEventListener("click", () => {
    balance.classList.remove("d-none");
    cardEditarOperacion.classList.add("d-none");
  });

  //                             BOTON ELIMINAR OPERACION

  const btnsEliminar = document.querySelectorAll(".btn-eliminar");

  btnsEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arregloSinOperacion = arrOperaciones.filter(
        (operacion) => operacion.id !== e.target.dataset.id
      );
      localStorage.setItem(
        "arrOperaciones",
        JSON.stringify(arregloSinOperacion)
      );
      arrOperaciones = JSON.parse(localStorage.getItem("arrOperaciones"));
      operacionAgregada(arrOperaciones);
      listaOperaciones(arrOperaciones);
    });
  });
};

//                                            *********************************************************************
//                                                                     SECCION BALANCE
//                                            *********************************************************************

// Función que pinta las ganacias, los gastos y el balance
const totalBalance = (arr) => {
  const resultGanancias = arr
    .filter((operacion) => operacion.tipo === "ganancia")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  const totalGanancia = (document.getElementById(
    "total-ganancia"
  ).innerHTML = `<p class="fs-5">Ganancias</p>
 <div class="total-ganancias fw-bold" style="color:rgb(109, 213, 6);" aria-label="suma de ganancias">+$${resultGanancias}</div>`);

  const resultGastos = arr
    .filter((operacion) => operacion.tipo === "gasto")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  const totalGastos = (document.getElementById(
    "total-gastos"
  ).innerHTML = `<p class="fs-5">Gastos</p>
  <div class="total-gastos fw-bold" style="color:rgb(209, 7, 7);" aria-label="suma de gastos">-$${resultGastos}</div>`);

  const totalDeBalance = (document.getElementById(
    "total-balance"
  ).innerHTML = `<h4>Total</h4>
  <div class="total-total fw-bold fs-4" aria-label="balance de totales">$${
    resultGanancias - resultGastos
  }</div>`);
};

//                             ***********************************************
//                                          SECCION FILTROS
//                             ***********************************************

//          ***** FILTRO POR GASTO/GANANCIA *****

// let arrTipoFiltro = JSON.parse(localStorage.getItem("arrOperaciones")) || [];

const selectFilterTipo = document.getElementById("select-filter-tipo");

// selectFilterTipo.addEventListener("change", (e) => {
//   if (e.target.value !== "todos") {
//     const arrFiltroTipo = arrOperaciones.filter(
//       (operacion) => operacion.tipo == e.target.value
//     );
//     localStorage.setItem("arrTipoFiltro", arrFiltroTipo);
//     localStorage.setItem("arrTipoFiltro", JSON.stringify(arrFiltroTipo));

//     operacionAgregada(arrFiltroTipo);
//   } else {
//     operacionAgregada(arrOperaciones);
//   }
// });

//           ****** FILTRO POR CATEGORIA *******

// Arreglo donde se guardan las categorias predeterminadas y donde se suman nuevas

let arrCategoriasIniciales = JSON.parse(localStorage.getItem("categorias")) || [
  {
    categoria: "Comida",
    id: uuidv4(),
  },
  {
    categoria: "Servicios",
    id: uuidv4(),
  },
  {
    categoria: "Salidas",
    id: uuidv4(),
  },
  {
    categoria: "Educacion",
    id: uuidv4(),
  },
  {
    categoria: "Transporte",
    id: uuidv4(),
  },
  {
    categoria: "Trabajo",
    id: uuidv4(),
  },
];

// Función que genera las categorias tomando el objeto que esta en el arreglo de categorias iniciales

const generarFiltrosCategorias = (arr) => {
  const selects = document.getElementsByClassName("categoria-select");

  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    select.innerHTML = "";
    if (select.classList.contains("filtro-categoria")) {
      select.innerHTML = '<option value="todas">Todas</option>';
    }
    for (let j = 0; j < arr.length; j++) {
      select.innerHTML += `<option value=${arr[j].categoria}>${arr[j].categoria}</option>`;
    }
  }
};

const selectFilterCategorias = document.getElementById(
  "select-filter-categorias"
);

// let arrCategoriaFiltro =
//   JSON.parse(localStorage.getItem("arrOperaciones")) || [];

// // Función que realiza el filtro por categoria

// selectFilterCategorias.addEventListener("input", (e) => {
//   if (e.target.value !== "todas") {
//     const arrFiltroCategorias = arrOperaciones.filter(
//       (operacion) => operacion.categoria === e.target.value
//     );
//     localStorage.setItem("arrCategoriaFiltro", arrFiltroCategorias);
//     localStorage.setItem(
//       "arrCategoriaFiltro",
//       JSON.stringify(arrFiltroCategorias)
//     );

//     operacionAgregada(arrFiltroCategorias);
//   } else {
//     operacionAgregada(arrOperaciones);
//   }
//});




//         ****************   FILTROS ********************

const filtroOrdenarPor = document.getElementById("filtro-ordenar-por");
const filtroDesde = document.getElementById("date");

const filtros = (e) => {
  const porCategoria = selectFilterCategorias.value;
  const porTipo = selectFilterTipo.value;
  const porOrden = filtroOrdenarPor.value;
  const ordenDesde = filtroDesde.value;

  let arrOperaciones = obtenerOperaciones();

  if (porCategoria !== "todas") {
    arrOperaciones = arrOperaciones.filter(
      (operacion) => operacion.categoria === porCategoria
    );
  }

  if (porTipo !== "todos") {
    arrOperaciones = arrOperaciones.filter(
      (operacion) => operacion.tipo === porTipo
    );
  }

  if (porOrden === "mas-reciente") {
    arrOperaciones = arrOperaciones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }
  if (porOrden === "menos-reciente") {
    arrOperaciones = arrOperaciones.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }

  if (porOrden === "menor-monto") {
    arrOperaciones = arrOperaciones.sort(
      (a, b) => Number(a.monto) - Number(b.monto)
    );
  }
  if (porOrden === "mayor-monto") {
    arrOperaciones = arrOperaciones.sort(
      (a, b) => Number(b.monto) - Number(a.monto)
    );
  }
  if (porOrden === "a-z") {
    arrOperaciones = arrOperaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
  if (porOrden === "z-a") {
    arrOperaciones = arrOperaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return -1;
      }
    });
  }
  
  if(ordenDesde !== new Date()){
    arrOperaciones = arrOperaciones.filter(operacion =>  
      (new Date(operacion.fecha) >= new Date(ordenDesde)))
      
      console.log(ordenDesde !== new Date())
    }
  operacionAgregada(arrOperaciones);
  listaOperaciones(arrOperaciones);
};

selectFilterCategorias.addEventListener("change", filtros);
selectFilterTipo.addEventListener("change", filtros);
filtroOrdenarPor.addEventListener("change", filtros);
filtroDesde.addEventListener("change", filtros);


//                                            *********************************************************************
//                                                                     SECCION CATEGORIA
//                                            *********************************************************************

const categoriaNuevaBtn = document.getElementById("agregar-categoria-nueva");
const inputNombreCategoria = document.getElementById("nombre-input");
const inputNombreEditadoCategoria = document.getElementById(
  "editado-nombre-input"
);
const ListaDeCategorias = document.getElementById("lista-categorias");
const btnCancelarCategoria = document.getElementById(
  "cancelar-categoria-editada"
);

// Botón que agrega una categoria nueva

const inputAgregarCategoria = document.getElementById(
  "input-agregar-categoria"
);
const btnAgregarCategoria = document.getElementById(
  "agregar-categoria-editada"
);

categoriaNuevaBtn.addEventListener("click", () => {
  if (inputNombreCategoria.value.trim().length === 0) {
    return;
  }

  const categoriaAdicional = {
    categoria: inputNombreCategoria.value,
    id: uuidv4(),
  };
  arrCategoriasIniciales.push(categoriaAdicional);

  inputNombreCategoria.value = "";
  localStorage.setItem("categorias", JSON.stringify(arrCategoriasIniciales));
  objetoCategorias = JSON.parse(localStorage.getItem("categorias"));

  pintarCategorias(arrCategoriasIniciales);
  generarFiltrosCategorias(arrCategoriasIniciales);
});

 // Fincion que pinta las categorias 

const pintarCategorias = (arr) => {
  let str = "";
  arr.forEach((arrCategoriasIniciales) => {
    const { id, categoria } = arrCategoriasIniciales;
    str += ` <div class="d-flex justify-content-between mt-3 mb-2">
                 <div style="color:#00947e; background-color: #ebfffc;">${categoria}</div>
                  <div>
                    <a href="#" class="btn-editar-categoria me-2" data-id=${id}>Editar</a>
                    <a href="#" class="btn-eliminar-categoria" data-id=${id}>Eliminar</a> 
                  </div>
                </div>`;
  });

  ListaDeCategorias.innerHTML = str;

  // Boton que elimina categoria

  const btnEliminarCategoria = document.querySelectorAll(
    ".btn-eliminar-categoria"
  );
  const btnEditarCategoria = document.querySelectorAll(".btn-editar-categoria");

 // Funcion que busca la caegoria seleccionada y las operaciones que tienen esa categoria e inicializa
 // la funcion que las elimina

  const eliminarCategoria = (arr, e, arrOperaciones) =>{
    const categoriaAEliminar = arr.find(
      (categoria) => categoria.id === e.target.dataset.id
    ).categoria;
    const categoriaEliminada = arr.filter(
      (categoria) => categoria.id !== e.target.dataset.id
    );
    console.log(categoriaEliminada);
    console.log(categoriaAEliminar);
    const operacionEliminada = arrOperaciones.filter(
      (operacion) => operacion.categoria !== categoriaAEliminar
    );
    console.log(operacionEliminada);
    arrActualizado(categoriaEliminada, operacionEliminada)
  }

  // Funcion que actualiza los arreglos con la categoria eliminada y las operaciones de esta

  const arrActualizado = (arrCategoria, arrOperacion) => {
    localStorage.setItem("categorias", JSON.stringify(arrCategoria));
    arrCategoriasIniciales = JSON.parse(localStorage.getItem("categorias"));
    pintarCategorias(arrCategoriasIniciales);
    generarFiltrosCategorias(arrCategoriasIniciales);
    localStorage.setItem("arrOperaciones", JSON.stringify(arrOperacion));
    arrOperaciones = JSON.parse(localStorage.getItem("arrOperaciones"));
    operacionAgregada(arrOperaciones);
    listaOperaciones(arrOperaciones);
  }

  // Boton de eliminar categoria que corre la funcion de eliminar

  btnEliminarCategoria.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      eliminarCategoria(arrCategoriasIniciales, e, arrOperaciones);
    })
  })


  // Boton que trae el formulario para editar categoria

  btnEditarCategoria.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      cardEditarcategoria.classList.remove("d-none");
      cardCategoria.classList.add("d-none");
      editarCategorias = arrCategoriasIniciales.filter(
        (categoria) => categoria.id === e.target.dataset.id
      );
      editarCategorias.forEach((element) => {
        id = element.id;
        inputNombreEditadoCategoria.value = element.categoria;
      });
    });
  });
  // Boton que agrega categoria editada

  btnAgregarCategoria.addEventListener("click", () => {

    cardEditarcategoria.classList.add("d-none");
    cardCategoria.classList.remove("d-none");

    const cambiarCategoria = arrCategoriasIniciales.filter(
      (categoria) => categoria.id === editarCategorias[0].id
    );

    const editarCategoriaDeOperacion = (arr) => {
      arr.forEach((operacionElegida) => {
        if(operacionElegida.categoria === editarCategorias[0].categoria){
          operacionElegida.categoria = inputNombreEditadoCategoria.value
        }
      })
      localStorage.setItem("arrOperaciones", JSON.stringify(arr));
      const nuevaOperacionEditada = JSON.parse(localStorage.getItem("arrOperaciones"));
      operacionAgregada(nuevaOperacionEditada)
    };
    editarCategoriaDeOperacion(arrOperaciones)

    const agregarCategoriaEditada = cambiarCategoria[0];
    agregarCategoriaEditada.categoria = inputNombreEditadoCategoria.value;
    const edicionOperacion = arrCategoriasIniciales.map((categoria) =>
      categoria.id === editarCategorias[0].id
        ? agregarCategoriaEditada
        : categoria
    );
    console.log(edicionOperacion);

    localStorage.setItem("categorias", JSON.stringify(edicionOperacion));
    arrCategoriasIniciales = JSON.parse(localStorage.getItem("categorias"));
    generarFiltrosCategorias(arrCategoriasIniciales);
    pintarCategorias(arrCategoriasIniciales);
  });

  btnCancelarCategoria.addEventListener("click", () => {
    cardEditarcategoria.classList.add("d-none");
    cardCategoria.classList.remove("d-none");
  });
};
pintarCategorias(arrCategoriasIniciales);
 

//                                            *********************************************************************
//                                                                     SECCION REPORTES
//                                            *********************************************************************

//*** Resumen

// Funcion que realiza un filtrado de las operaciones y devuelve las categorias y meses con mayor ganancia y
// las categorias y meses con mayor con mayor gasto

const reportesResumen = (arr) => {
  const resumenMayorGanancia = arr
    .filter((operacion) => operacion.tipo === "ganancia")
    .sort((a, b) => b.monto - a.monto);
  if (resumenMayorGanancia.length > 0) {
    document.getElementById(
      "categoria-mayor-ganancia"
    ).innerHTML = `<h6>Categoria con mayor ganancia</h6>
  <div>
    <div class="color">${resumenMayorGanancia[0].categoria}
    </div>
  </div> 
      <div class= "mb-4  align-item-center" style="color:rgb(109, 213, 6);">+$${resumenMayorGanancia[0].monto}</div>`;
  }

  const resumenMayorGasto = arr
    .filter((operacion) => operacion.tipo === "gasto")
    .sort((a, b) => b.monto - a.monto);
  if (resumenMayorGasto.length > 0) {
    document.getElementById(
      "categoria-mayor-gasto"
    ).innerHTML = `<h6>Categoria con mayor gasto</h6>
<div>
  <div class="color">${resumenMayorGasto[0].categoria}
  </div>
</div> 
    <div class= "mb-4  align-item-center" style="color:rgb(209, 7, 7);">-$${resumenMayorGasto[0].monto}</div>`;
  }

//*********** Falta Categoria con Mayor Balance**********


//   document.getElementById('categoria-mayor-balance').innerHTML =
//   `<h6>Categoria con mayor Balance</h6>
//    <div>
//     <div class="color">${resumenMayorGasto[0].categoria}
//     </div>
//    </div> 
//    <div class= "mb-4  align-item-center" style="color">-$${}</div>`;
//   console.log()
 
};




const mesMayorGananciaYGasto = (arr) => {
  const resumenMayorMonto = arr.sort((a, b) => b.monto - a.monto);
  

  const gananciaMayor = resumenMayorMonto.filter(
    (operacion) => operacion.tipo === "ganancia"
  );
  if (gananciaMayor.length > 0){
    document.getElementById(
      "mes-mayor-ganancia"
    ).innerHTML = `<h6>Mes con mayor ganancia</h6>
  <div>
    <div class="color">${
      new Date(gananciaMayor[0].fecha).getMonth() + 1
    }/${new Date(gananciaMayor[0].fecha).getFullYear()}
    </div>
  </div> 
      <div class= "mb-4  align-item-center" style="color:rgb(109, 213, 6);">+$${
        gananciaMayor[0].monto
      }</div>`;
  }


  const gastoMayor = resumenMayorMonto.filter(
    (operacion) => operacion.tipo === "gasto"
  );
  if (gastoMayor.length > 0){
    document.getElementById(
      "mes-mayor-gasto"
    ).innerHTML = `<h6>Mes con mayor gasto</h6>
  <div>
    <div class="color">${new Date(gastoMayor[0].fecha).getMonth() + 1}/${new Date(
      gastoMayor[0].fecha
    ).getFullYear()}
    </div>
  </div> 
      <div class= "mb-4 justify-content-center" style="color:rgb(209, 7, 7);">-$${
        gastoMayor[0].monto
      }</div>`;
  }
 

totalPorMes(JSON.parse(localStorage.getItem("arrOperaciones")));
};


//Totales por categoria

// Funcion que filtra las categorias y operaciones y devuelve las categorias que tienen operaciones y
// la suma total de sus ganancias y gastos y el balance

// const totalesPorCategoria = (arrOperaciones, arrCategoriasIniciales) => {
//   let arrConMonto = [];
//   //totalesPorCategoria.innerHTML = "";
//   arrCategoriasIniciales.forEach((categoria) => {
//     const porCategoria = arrOperaciones.filter(
//       (operacion) => operacion.categoria === categoria.categoria
//     );
//     porCategoria.forEach((operacion) => {
     
//       if (operacion.monto !== 0) {
//         arrConMonto.push(operacion);
//       }

//       const totalGananciaCategoria = porCategoria
      
//         .filter((operacion) => operacion.tipo === "ganancia")
//         .reduce((count, current) => count + Number(current.monto), 0);
//       const totalGastoCategoria = porCategoria
//         .filter((operacion) => operacion.tipo === "gasto")
//         .reduce((count, current) => count + Number(current.monto), 0);
//       console.log(porCategoria)  
//       const totalPorCategoria = (document.getElementById(
//         "total-categoria-categoria"
//       ).innerHTML += `<div class="mb-4 mt-4">${categoria.categoria}</div>`);
//       const totalPorCategoriaGanancia = (document.getElementById(
//         "total-categoria-ganancias"
//       ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(109, 213, 6);">+$${totalGananciaCategoria}</div>`);
//       const totalPorCategoriaGasto = (document.getElementById(
//         "total-categoria-gastos"
//       ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(209, 7, 7);">-$${totalGastoCategoria}</div>`);
//       const totalPorCategoriaBalance = (document.getElementById(
//         "total-categoria-balance"
//       ).innerHTML += `<div class="mb-4 mt-4 text-end">$${
//         totalGananciaCategoria - totalGastoCategoria
//       }</div>`);
     
//     });
//     totalesPorCategoria(JSON.parse(localStorage.getItem("arrOperaciones, arrCategoriasIniciales")));
//   });
  
// };

const totalesPorCategoria = (arrOperaciones, arrCategoriasIniciales) => {
  arrCategoriasIniciales.forEach(categoria => {
    const porCategoria = arrOperaciones.filter(operacion => operacion.categoria === categoria)
    const porCategoriaGanancia = porCategoria.filter(operacion => operacion.tipo === 'ganancia').reduce((count, current) => count + Number(current.monto), 0)
    const porCategoriaGasto = porCategoria.filter(operacion => operacion.tipo === 'gasto').reduce((count, current) => count + Number(current.monto), 0)
    console.log(`La categoria ${categoria.categoria} su gasto es de: ${porCategoriaGasto}`)
    console.log(`La categoria ${categoria.categoria} su ganacia es de: ${porCategoriaGanancia}`)
    console.log(`El balance de la categoria  ${categoria.categoria} es de ${porCategoriaGanancia - porCategoriaGasto}`)
  console.log(porCategoriaGanancia)
  })
  
};
//totalesPorCategoria(JSON.parse(localStorage.getItem("arrOperaciones, categorias")));

// Totales por Mes

// Funcion que filtra las operaciones y devuelve los meses que tienen operaciones y
// la suma total de sus ganancias y gastos y su balance

const totalPorMes = (arr) => {
  const mesesSinRepetir = [
    ...new Set(
      arr.map(
        (operacion) =>
          `${new Date(operacion.fecha).getMonth() + 1}/${new Date(
            operacion.fecha
          ).getFullYear()}`
      )
    ),
  ].sort();

  for (let i = 0; i < mesesSinRepetir.length; i++) {
    const operacionesPorMes = arr.filter(
      (operacion) =>
        `${new Date(operacion.fecha).getMonth() + 1}/${new Date(
          operacion.fecha
        ).getFullYear()}` === mesesSinRepetir[i]
    );
    const porTipoGanancia = operacionesPorMes
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((prev, current) => prev + Number(current.monto), 0);
    const porTipoGasto = operacionesPorMes
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((prev, current) => prev + Number(current.monto), 0);

    const totalMesMeses = (document.getElementById(
      "total-mes-meses"
    ).innerHTML += `<div class="mt-4 mb-4">${mesesSinRepetir[i]} </div>`);
    const totalMesGanancia = (document.getElementById(
      "total-mes-ganancias"
    ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(109, 213, 6);">+$${porTipoGanancia}</div>`);
    const totalMesGastos = (document.getElementById(
      "total-mes-gastos"
    ).innerHTML += `<div class="mb-4 mt-4 text-end" style="color:rgb(209, 7, 7);">+$${porTipoGasto}</div>`);
    const totalMesBalance = (document.getElementById(
      "total-mes-balance"
    ).innerHTML += `<div class="mb-4 mt-4 text-end">+$${
      porTipoGanancia - porTipoGasto
    }</div>`);
  }
};


const inicializar = () => {
  fechaInput.valueAsDate = new Date();
  filtroDesde.valueAsDate = new Date();
  generarFiltrosCategorias(arrCategoriasIniciales);
  operacionAgregada(arrOperaciones);
  listaOperaciones(arrOperaciones);
  totalBalance(arrOperaciones);
  obtenerOperaciones(arrOperaciones);
  totalesPorCategoria(arrOperaciones, arrCategoriasIniciales);
  totalPorMes(arrOperaciones);
};

window.onload = inicializar;

require('colors');

const { guardarDB,
        leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
    } = require('./helpers/inquirer');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

//console.clear();

const main = async() => {

    let opt = '';
    let tareasArr = [];

    const tareas = new Tareas();
    const tareasDB = leerDB();

    //console.log(tareasDB);
    

    if ( tareasDB ){
        //ESTABLECER TAREAS
        tareas.cargarTareasFromArray(tareasDB);
    }


    
    do{
        opt = await inquirerMenu();       

        switch(opt){
            case '1':
                // crear opción
                const description = await leerInput('Introduce la desripción de la nueva tarea: ');
                tareas.crearTarea(description);
                break
            case '2':
                tareasArr = tareas.listadoArr;
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break; 
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if( id !== '0'){
                    const ok = await confirmar('¿Estás seguro?');
                    if ( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
                break;                
        }

        guardarDB(JSON.stringify(tareas.listadoArr));

        await pausa();

    }while(opt != 0);

}

main();
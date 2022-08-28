const Tarea = require('./tarea');

/**
 * _listado:
 *  { 
 * 'uuid-31354364351354:{ id: 12, desc: asd, completadoEn: fecha1}
 * 'uuid-31354364351354:{ id: 12, desc: asd, completadoEn: fecha1}
 * 'uuid-31354364351354:{ id: 12, desc: asd, completadoEn: fecha1}
 * }
 */
class Tareas{
    _listado = {};
    _listadoArray = [];

    constructor(){
        this._listado = {};
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }

    }

    crearTarea( desc = '' ){
        const tempTarea  = new Tarea(desc);
        this._listado[tempTarea.id] = tempTarea;
    } 

    get listadoArr(){  
        const listado = [];
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto(){
        console.log('\n');
        this.listadoArr.forEach((tarea,index) =>{
            const idx = `${index+1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true ){
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea =>{
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ?`${completadoEn}`.green
                                :'Pendiente'.red;
            if( completadas ){
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${ desc } :: ${ completadoEn.green }`);
                }
            }
            else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${ desc } :: ${ estado }`);
                }
            }
        })
    }

    toogleCompletadas( ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(tarea=>{
            if ( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }

}




module.exports = Tareas;
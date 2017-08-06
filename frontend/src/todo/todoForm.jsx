import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => (
    <div className='todoForm' role='form'>
        <Grid cols='12 9 11'>
            <input id='description' className='form-control' placeholder='Adicione uma tarefa' values={props.description} onChange={props.handleChange}></input>
        </Grid>
        <Grid cols='12 3 2'>
            <IconButton style='primary' icon='plus' onClick={props.handleAdd}/> 
        </Grid>
    </div>
)
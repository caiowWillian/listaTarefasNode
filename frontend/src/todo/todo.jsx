import React, {Component} from 'react'
import axios from 'axios'
import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    
    constructor(props){
        super(props)
        this.state = { description: 'dada', list: [] }
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleCheckPeding = this.handleCheckPeding.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.refresh()
    }
    
    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp => this.setState({
            ...this.state,
            description,
            list: resp.data
        }))
    }

    handleChange(e){
        this.setState({ ...this.state, description: e.target.value })
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL, { description })
        .then(resp => this.refresh())
    }
    
    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh(this.state.description))
    }

    handleCheck(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: true}).then(resp => this.refresh(this.state.description))
    }

    handleCheckPeding(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:false}).then(resp => this.refresh(this.state.description))
    }

    handleSearch(){
        this.refresh()
    }

    render(){
        return (
            <div>
                <PageHeader 
                    name='Tarefas' 
                    small='Cadastro'>
                </PageHeader>
                
                <TodoForm 
                    handleChange={this.handleChange} 
                    description={this.state.description} 
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}>
                </TodoForm>
                
                <TodoList 
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleCheck={this.handleCheck}
                    handleCheckPeding={this.handleCheckPeding}> 
                </TodoList>
            </div>
        )
    }
}
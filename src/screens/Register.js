import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

initialState = {
    nome: '',
    email: '',
    password: ''
}

class Register extends Component {
    state = { ...initialState }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({ ...initialState })
            this.props.navigation.navigate('Profile')
        }
    }
    
    creatingUser = () => {
        this.props.onCreateUser(this.state)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Nome'} style={styles.input}
                    autoFocus={true} value={this.state.name}
                    onChangeText={name => this.setState({ name })} />
                <TextInput placeholder={'E-mail'} style={styles.input}
                    keyboardType={'email-address'} value={this.state.email}
                    onChangeText={email => this.setState({ email })} />
                <TextInput placeholder={'Senha'} style={styles.input}
                    secureTextEntry={true} keyboardType={'email-address'}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} />
                <TouchableOpacity
                    onPress={this.creatingUser}
                    style={styles.buttom} >
                    <Text style={styles.buttomText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286F6',
        borderRadius: 5
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
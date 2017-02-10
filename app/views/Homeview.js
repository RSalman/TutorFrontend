import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {
    Grid,
    Row,
    Button
} from 'react-native-elements'
class Homeview extends Component{
    constructor(){
        super()
        this.state = {
            sideIsHidden: true
        }
        this.pressFunct = this.pressFunct.bind(this)

    }
    pressFunct () {
        var newSideIsHidden = !this.state.sideIsHidden;
        this.setState({
            sideIsHidden: newSideIsHidden
        });
        this.props.onPressFunct(this.state.sideIsHidden)

    }
    render (){
        return (
            <Grid>
                <Row>
                    <View style={{
                        backgroundColor: 'yellow',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Button raised
                                icon={{name: 'cached'}}
                                title='button icon'
                                onPress={this.pressFunct}
                        />
                    </View>
                </Row>
                <Row>
                    <View style={{backgroundColor: 'blue'}}>
                        <Text>Blue background</Text>
                    </View>
                </Row>
            </Grid>

        )
    }
}
export default Homeview

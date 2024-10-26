import React, {ReactNode} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text500} from './src/components/common/Texts';
import Button from './src/components/common/Button';
import {Icons} from './src/assets';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Image source={Icons.crash} style={styles.image} />
          <Text500>Something went wrong. Please try again.</Text500>
          <Button
            title="Try again"
            onPress={() => this.setState({hasError: false})}
            buttonStyle={styles.btn}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 200, height: 200},
  btn: {width: '40%', marginTop: 20},
});

export default ErrorBoundary;

---
title: "Refactors IRL"
date: "2019-09-17"
previous: "classes-vs-functions"
previousLabel: "Classes 🆚 Functions"
next: "conclusion"
nextLabel: "Conclusion 🔍"
---
It's time to put all this new information into practice. Lets take a look at one of our exisiting components and see how we can refactor it to use Hooks.

## Existing Class Component
```jsx
class QuoteFlow extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    requestApiCall: PropTypes.func.isRequired,
    selectedProduct: PropTypes.string.isRequired,
    schemaRequestInFlight: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { match } = props;

    this.baseRoute = match.path;
    this.basePath = match.url;
  }

  state = {
    schemaRequested: false
  }

  componentDidMount() {
    const { requestApiCall, selectedProduct } = this.props;
    requestApiCall(
      api.callNames.getProductSchema,
      {
        server: getConfigValue('hmsBaseUrl'),
        product: selectedProduct
      },
      modules.job.actions.GET_LOB_SCHEMA
    );
    this.setState({
      schemaRequested: true
    });
  }

  render() {
    const { location, schemaRequestInFlight } = this.props;
    const { schemaRequested } = this.state;

    return (
      <Loader loaded={schemaRequested && !schemaRequestInFlight}>
        <QuoteWizard
          baseRoute={this.baseRoute}
          basePath={this.basePath}
          pathName={location.pathname}
        />
      </Loader>
    );
  }
}

const mapDispatchToProps = {
  requestApiCall: modules.connectivity.actions.requestApiCall
};

const mapStateToProps = createStructuredSelector({
  selectedProduct: modules.job.selectors.getJobProduct,
  schemaRequestInFlight: modules.job.selectors.schemaRequestInFlight
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QuoteFlow
);

```

## Refactored to use Hooks
```jsx
function QuoteFlow({ match, location }) {
  // Redux Action
  const dispatchAction = useDispatch();
  const requestApiCall = useCallback(modules.connectivity.actions.requestApiCall, []);
  // Redux Selectors
  const selectedProduct = useSelector(modules.job.selectors.getJobProduct);
  const schemaRequestInFlight = useSelector(modules.job.selectors.schemaRequestInFlight);

  const [baseRoute] = useState(match.path);
  const [basePath] = useState(match.url);
  const [schemaRequested, setSchemaRequested] = useState(false);

  useEffect(() => {
    dispatchAction(
      requestApiCall(
        api.callNames.getProductSchema,
        {
          server: getConfigValue('hmsBaseUrl'),
          product: selectedProduct
        },
        modules.job.actions.GET_LOB_SCHEMA
      )
    );

    setSchemaRequested(true);
  }, []);

  return (
    <Loader loaded={schemaRequested && !schemaRequestInFlight}>
      <QuoteWizard
        baseRoute={baseRoute}
        basePath={basePath}
        pathName={location.pathname}
      />
    </Loader>
  );
}

QuoteFlow.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default QuoteFlow;

```
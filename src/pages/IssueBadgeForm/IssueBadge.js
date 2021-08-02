import { React, useState } from 'react'
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Container,
    Box,
    Typography,
    Grid,
} from '@material-ui/core'
import IssueBadgeForm from './IssueBadgeForm'
import Controls from '../../components/shared/controls/Controls'
import ActionDialog from '../../components/shared/ActionDialog';

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    titleContainer: {
        width: '100%',
        height: theme.spacing(10),
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://picsum.photos/1600/300")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: '0.3',
            zIndex: -1,
        },
    },
    titleGrid: {
        height: '100%',
    },
    title: {
        color: theme.palette.text.dark,
        font: 'IBM Plex Mono Regular',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    flexItemEnd: {
        display: "flex", 
        justifyContent: "flex-end", 
        alignItems: "flex-start",
    },
    metamaskButton: {
        backgroundColor: '#f6851b',
    }
}))

export default function IssueBadge() {
    const classes = useStyles()
    
    const [ web3User, setWeb3User ] = useState(false)
    const { connect, metaState } = useMetamask();

    const onClickWeb3 = () => {
        setWeb3User(true)
        if (!metaState.isAvailable) return
        if (!metaState.isConnected) {
            (async () => {
              try {
                await connect(ethers.providers.Web3Provider, {chainId: 4});
              } catch (error) {
                console.log(error);
              }
            })();
        }
    }


    return (
        <div>
            {web3User && !metaState.isAvailable ? 
                <ActionDialog
                    title="🦊 Instala Metamask  🦊"
                    contentText="No se ha detectado Metamask. Para poder realizar acciones utilizando Ethereum debes instalar el plugin de Metamask.\n Una vez hayas finalizado la instalación refresca la página o pulsa en Hecho"
                    primaryActionButton="Ir a metamask.io"
                    primaryActionHandler={() => window.open("https://metamask.io", '_blank')}
                    secondaryActionButton="Hecho"
                    secondaryActionHandler={() => window.location.reload()}
                    // If the user simply closes the Dialog we asume its not a web3 user
                    closeHandler={() => setWeb3User(false)}
                />:
                ''
            }
            <CssBaseline />
            <main>
                <div className={classes.appBarSpacer} />
                <Box className={classes.titleContainer}>
                    <Grid
                        container
                        className={classes.titleGrid}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                component="h1"
                                variant="h3"
                                className={classes.title}
                            >
                                Formulario de emisión de sellos
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container justify="space-between">
                        <Grid item xs={8}>
                            <Typography component="p" variant="h5" gutterBottom>
                                Por favor, completa el siguiente formulario para
                                emitir un sello
                            </Typography>
                            <IssueBadgeForm />
                        </Grid>
                        <Grid item xs={3} className={classes.flexItemEnd}>
                            <Controls.Button
                                text="CONECTAR METAMASK 🦊"
                                className={classes.metamaskButton}
                                onClick={onClickWeb3}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}

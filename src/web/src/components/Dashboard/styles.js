// import { } from '../../styles';

const styles = theme => ({
    container: {
        marginTop: 60,
        padding: 20
    },
    avatar: {
        color: theme.palette.background.white,
        fontWeight: '500',
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginRight: theme.spacing(2)
    },
    chipCaption: {
        marginLeft: theme.spacing(1.5),
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2)
    },
    formHeading: {
        color: theme.palette.text.secondary
    },
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    headerContainer: {
        justifyContent: 'space-between'
    },
    headerLeft: {
        display: 'flex'
    },
    listNum: {
        marginRight: theme.spacing(3),
        color: theme.palette.text.secondary
    },
    badgeDot: {
        paddingRight: 10
    },
    paper: {
        padding: theme.spacing(3)
    },
    responseRatio: {
        lineHeight: 2.1
    },
    summaryPanel: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tableHeaderTitle: {
        marginRight: theme.spacing(1)
    },
    tableHeaderTopLeft: {
        marginTop: theme.spacing(3),
        display: 'flex',
    },
    titleContainer: {
        maxWidth: '80%',
        display: 'flex'
    }
});
    
export default styles;
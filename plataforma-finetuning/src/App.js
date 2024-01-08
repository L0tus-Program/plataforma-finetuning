import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import './App.css';



function App() {
  const [system, setSystem] = useState('');
  const [key, setKey] = useState('');
  const [models, setModels] = useState('');
  const [info, setInfo] = useState([{ user: '', response: '' }]);

  const handleClear = () => {
    setSystem('');
    setKey('');
    setModels('');
    setInfo([{ user: '', response: '' }]);
  };

  const handleModelChange = (event) => {
    setModels(event.target.value);
  };

  const handleInfoChange = (index, field, value) => {
    const newInfo = [...info];
    newInfo[index][field] = value;
    setInfo(newInfo);
  };

  const handleAddInfo = () => {
    setInfo([...info, { user: '', response: '' }]);
  };

  const handleRemoveInfo = (index) => {
    const newInfo = [...info];
    newInfo.splice(index, 1);
    setInfo(newInfo);
  };

  const handleSubmit = () => {
    if (info.length < 10) {
      alert('Preencha pelo menos 10 conjuntos de USER e RESPONSE!');
      return;
    }

    const dataToSend = { system, key, models, info };

    // Enviar os dados como um POST usando fetch
    fetch('http://127.0.0.1:5000/receber_dados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Dados enviados com sucesso:', data);
        // Lógica adicional após o envio bem-sucedido
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados:', error);
        // Lógica de tratamento de erro
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Configurações para Fine-tuning
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="System"
          value={system}
          onChange={(e) => setSystem(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Key"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          value={models}
          onChange={handleModelChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Selecione um modelo' }}
          placeholder="Selecione um modelo"
        >
          <MenuItem value="" disabled>
            Selecione um modelo
          </MenuItem>
          <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
          <MenuItem value="gpt-4.0-plus">GPT-4.0 Plus</MenuItem>
        </Select>
      </Grid>

      {info.map((item, index) => (
        <Grid key={index} item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label={`User ${index + 1}`}
              value={item.user}
              onChange={(e) => handleInfoChange(index, 'user', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={`Response ${index + 1}`}
              value={item.response}
              onChange={(e) => handleInfoChange(index, 'response', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => handleRemoveInfo(index)}>Remover</Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={handleAddInfo}>Adicionar</Button>
      </Grid>

      <Grid item xs={12} className="buttonsContainer">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button color='error' className="clearButton" onClick={handleClear}>Limpar</Button>
          <Button className="sendButton" onClick={handleSubmit}>Enviar</Button>
        </ButtonGroup>
      </Grid>

      <Grid item xs={12}>
        {info.length < 10 && (
          <Alert severity="error">Preencha pelo menos 10 conjuntos de USER e RESPONSE!</Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default App;

import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PixIcon from '@mui/icons-material/Pix';


/*function typebot() {
  const typebotInitScript = document.createElement("script");
  typebotInitScript.type = "module";
  typebotInitScript.innerHTML = `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2/dist/web.js'

    Typebot.initBubble({typebot: "basic-chat-gpt-ou3ekz6" });
    `;
  document.body.append(typebotInitScript);
}*/


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
    fetch('https://fine.lotus-dev.com.br/receber_dados', {
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
    <><Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }} // Isso centraliza verticalmente o conteúdo
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
          onChange={(e) => setSystem(e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Key"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)} />
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
          <MenuItem value="gpt-3.5-turbo-1106">GPT-3.5 Turbo-1106</MenuItem>
          <MenuItem value="gpt-4">GPT-4</MenuItem>
          <MenuItem value="gpt-4-1106-preview">GPT-4 Turbo</MenuItem>
        </Select>
      </Grid>

      {info.map((item, index) => (
        <Grid key={index} item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label={`User ${index + 1}`}
              value={item.user}
              onChange={(e) => handleInfoChange(index, 'user', e.target.value)}
              fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={`Response ${index + 1}`}
              value={item.response}
              onChange={(e) => handleInfoChange(index, 'response', e.target.value)}
              fullWidth />
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
        <ButtonGroup variant="text" size='large' aria-label="outlined primary button group">
          <Button color='error' className="clearButton" onClick={handleClear}>Limpar</Button>
          <Button className="sendButton" onClick={handleSubmit}>Enviar</Button>
        </ButtonGroup>
      </Grid>

      <Grid item xs={12}>
        {info.length < 10 && (
          <Alert severity="error">Preencha pelo menos 10 conjuntos de USER e RESPONSE!</Alert>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Conecte-se comigo!
          <a href='https://www.linkedin.com/in/felipelgomes/' target='_blank' rel="noreferrer"><LinkedInIcon fontSize='large' /></a>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Colabore!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          PayPal: felipesgomes.1@gmail.com <MonetizationOnIcon fontSize='large' />
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Mercado Pago: <a href='https://link.mercadopago.com.br/plataformafine' target='_blank' rel='noreferrer'><MonetizationOnIcon fontSize='large' /></a>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Pix: 51992090470 <PixIcon fontSize='large' />
        </Typography>
      </Grid>
    </Grid>

      <typebot />
    </>


  );
}

export default App;
 
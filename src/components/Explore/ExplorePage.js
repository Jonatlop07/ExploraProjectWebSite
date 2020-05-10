import React, { Component } from "react";

export default class ExplorePage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         publications: [],
      };
   }

   componentDidMount() {
      this.setState({ loading: true });
   }

   render() {
      return (
         <div>
            <h1>PublicationsPage</h1>;
            <ContenedorPublicaciones />
         </div>
      );
   }
}

class Publicacion extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div>
            <a href={this.props.enlace}>{this.props.titulo}</a>
            <h2>Fecha de publicación: {this.props.fecha}</h2>
            <p>{this.props.descripcion}</p>
         </div>
      );
   }
}

const arregloPublicaciones = [
   {
      enlace: "http://miPublicacion1.com",
      titulo: "El arte en la vida de las personas",
      fecha: "09/05/2020",
      descripcion: "Etc",
   },
   {
      enlace: "http://miPublicacion2.com",
      titulo: "Desarrollo sostenible para una comunidad africana",
      fecha: "08/05/2020",
      descripcion: "Etc",
   },
   {
      enlace: "http://miPublicacion3.com",
      titulo: "Videojuegos que deberias probar",
      fecha: "07/05/2020",
      descripcion: "Etc",
   },
];

class ContenedorPublicaciones extends Component {
   render() {
      const publicaciones = arregloPublicaciones.map((publicacion, index) => {
         const { enlace, titulo, fecha, descripcion } = publicacion;
         return (
            <Publicacion
               key={index}
               enlace={enlace}
               titulo={titulo}
               fecha={fecha}
               descripcion={descripcion}
            />
         );
      });
      return (
         <div>
            <h1>Publicaciones:</h1>
            {publicaciones.length > 0 && publicaciones}
         </div>
      );
   }
}

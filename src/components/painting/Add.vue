
<template>
    <form onSubmit={this.handlePaintingAdd}>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label htmlFor="name">Painting Name:</label>
                <input class="form-control" type="text" value={name} onChange={this.handleInputChange} name="name" placeholder="Name of painting" required />
            </div>
            <div class="form-group col-md-6">
                <label htmlFor="artist">Artist Name:</label>
                <input class="form-control" type="text" value={artist} onChange={this.handleInputChange} name="artist" placeholder="Name of artist" required />
            </div>
        </div>
        <div class="form-group">
            <label htmlFor="url">Image URL:</label>
            <input class="form-control" type="text" value={url} onChange={this.handleInputChange} name="url" placeholder="Painting Image URL" required />
        </div>
        <div class="form-group">
            <label htmlFor="inputAddress2">Painting Attributes:</label>
            {
                techniques && techniques.map((name, index) => (
                    <div key={`attr${index + 1}`} class="input-group mb-2">
                        <input
                            type="text"
                            placeholder={`Atrribute #${index + 1}`}
                            aria-label={`Atrribute #${index + 1}`}
                            value={name}
                            onChange={(e) => this.handleTechniqueNameChange(index, e)}
                        />
                        <div class="input-group-append">
                            <button
                                type="button"
                                onClick={(e) => this.handleTechniqueRemove(index)}
                                class="btn btn-outline-secondary btn-sm"
                            >
                            <FontAwesomeIcon icon={faTimes} /> Remove
                            </button>
                        </div>
                    </div>
                ))
            }
            <button
                type="button"
                onClick={this.handleTechniqueAdd}
                class="btn btn-outline-primary btn-sm"
                >
                <FontAwesomeIcon icon={faPlus} /> Add
            </button>
        </div>
        <button type="submit" class="btn btn-primary">Create Painting</button>
    </form>
</templat>
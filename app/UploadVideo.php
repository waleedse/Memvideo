<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UploadVideo extends Model
{					
    protected $table = 'videos';
    protected $fillable = [
    	'title',
		'description',
		'thumb_image',
    	't_video',
        'm_video',
        'status',
    	'created_at',
    	'updated_at'
	];
	
}
